import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  Action,
  CardConfig,
  EmptyStateConfig, Filter,
  FilterConfig, FilterEvent, FilterField, FilterType,
  PaginationConfig, PaginationEvent,
  SortConfig, SortEvent,
  SortField,
  TableConfig, TableEvent,
  ToolbarConfig
} from 'patternfly-ng';
import {WetrAuthenticationService} from '../shared/wetr-authentication.service';
import {Router} from '@angular/router';
import {WetrCommunication} from '../shared/wetr-communication.service';
import User = WetrCommunication.User;
import Station = WetrCommunication.Station;
import StationType = WetrCommunication.StationType;
import Community = WetrCommunication.Community;
import {WetrNotificationServiceService} from '../shared/wetr-notification-service.service';

@Component({
  selector: 'wea5-wetr-station-settings',
  templateUrl: './wetr-station-settings.component.html',
  styles: []
})
export class WetrStationSettingsComponent implements OnInit {

  actualStation: Station = null;

  // Form
  selectedStation: String;
  selectedName: String;
  selectedType: Number;
  selectedCommunity: Number;
  selectedLongitude: String;
  selectedLatitude: String;
  selectedAltitude: String;

  typeArr: StationType[];
  communitiesArr: Community[];

  // Table
  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('buttonTemplate') buttonTemplate: TemplateRef<any>;

  actionsText = '';
  allRows: any[] = [];
  columns: any[];
  currentSortField: SortField;
  tableConfig: TableConfig;
  emptyStateConfig: EmptyStateConfig;
  filterConfig: FilterConfig;
  filteredRows: any[] = [];
  filtersText = '';
  isAscendingSort = true;
  paginationConfig: PaginationConfig;
  rows: any[];
  rowsAvailable = true;
  separator: Object;
  sortConfig: SortConfig;
  toolbarConfig: ToolbarConfig;

  user: User;

  constructor(private wetrAuth: WetrAuthenticationService,
              private router: Router,
              private userCommunication: WetrCommunication.UsersClient,
              private stationCommunication: WetrCommunication.StationsClient,
              private communityCommunication: WetrCommunication.CommunitiesClient,
              private errorMsg: WetrNotificationServiceService) { }

  ngOnInit() {
    this.checkIfAllowed();
    this.initTable();
    this.initData();
    this.initArrays();
  }

  checkIfAllowed() {
    if (this.wetrAuth.getActualUser() == null) {
      this.router.navigate(['/login']);
    } else {
      this.getActualUser(Number(this.wetrAuth.getActualUser()));
    }
  }

  getActualUser(id: number) {
    this.userCommunication.getUserById(id).subscribe(x => this.user = x);
  }

  initArrays() {
    this.communityCommunication.getAll().subscribe(x => this.communitiesArr = x);
    this.stationCommunication.getAllTypes().subscribe(x => this.typeArr = x);
  }

  onDetailButtonClick(id: String) {
    this.stationCommunication.getById(Number(id)).subscribe(x => this.filloutForm(x));
  }

  addMeasruementForStation() {
    if (this.actualStation != null) {
      this.router.navigate(['/measurement', this.actualStation.id]);
    } else {
      this.errorMessage(false, 'Measurement add', false);
    }
  }

  filloutForm(station: Station) {
    this.actualStation = station;
    this.selectedStation = station.name;
    this.selectedName = station.name;
    this.selectedType = station.stationType.id;
    this.selectedCommunity = station.community.id;
    this.selectedLongitude = station.longitude.toFixed();
    this.selectedAltitude = station.altitude.toFixed();
    this.selectedLatitude = station.latitude.toFixed();
  }

  addStation() {
    this.router.navigate(['/new']);
  }

  deleteStation() {
    if (this.actualStation != null) {
      this.stationCommunication.deleteStation(this.actualStation.id,
        this.getStationOutOfEntries()).subscribe(
        x => this.errorMessage(x, 'Delete', true));
    } else {
      this.errorMessage(false, 'Delete', false);
    }


  }

  saveChanges() {
    this.stationCommunication.updateStation(this.actualStation.id,
      this.getStationOutOfEntries()).subscribe(
        x => this.errorMessage(x, 'Update', false));
  }

  errorMessage(x: boolean, m: String, del: boolean) {
    if (!x) {
      this.errorMsg.messageFailure(m + ' failed', '');
    } else {
      this.errorMsg.messageSuccess(m + ' success', '');
    }

    if (del) {
      this.initData();
      this.updateRows(true);
    }
  }

  getStationOutOfEntries(): Station {
    const station: Station = new Station();
    station.id = this.actualStation.id;
    station.communityId = Number(this.selectedCommunity);
    station.name = String(this.selectedName);
    station.typeId = Number(this.selectedType);
    station.longitude = Number(this.selectedLongitude);
    station.latitude = Number(this.selectedLatitude);
    station.altitude = Number(this.selectedAltitude);
    station.creator = this.user.id;
    return station;
  }

  _compareFn(a, b) {
    // Handle compare logic (eg check if unique ids are the same)
    return a.id === b.id;
  }

  // -----------------------------------------------------------------------------------------
  // --------------------- Table -------------------------------------------------------------
  // -----------------------------------------------------------------------------------------

  initTable() {
    this.columns = [{
      cellTemplate: this.nameTemplate,
      draggable: true,
      prop: 'name',
      name: 'Name',
      resizeable: true,
      sortable: false // using sort menu
    }, {
      cellTemplate: this.buttonTemplate,
      draggable: true,
      prop: 'id',
      name: 'Details',
      resizeable: true,
      sortable: false // using sort menu
    }];

    this.initData();

    this.paginationConfig = {
      pageNumber: 1,
      pageSize: 10,
      pageSizeIncrements: [10, 50, 100],
      totalItems: this.filteredRows.length
    } as PaginationConfig;

    // Need to initialize for results/total counts
    this.updateRows(false);

    this.filterConfig = {
      fields: [{
        id: 'name',
        title: 'Name',
        placeholder: 'Filter by Name...',
        type: FilterType.TEXT
      }, {
        id: 'zip',
        title: 'ZIP',
        placeholder: 'Filter by ZIP...',
        type: FilterType.TEXT
      }, {
        id: 'community',
        title: 'Community',
        placeholder: 'Filter by Community...',
        type: FilterType.TEXT
      }, {
        id: 'district',
        title: 'District',
        placeholder: 'Filter by Community...',
        type: FilterType.TEXT
      }, {
        id: 'province',
        title: 'Province',
        placeholder: 'Filter by Community...',
        type: FilterType.TEXT
      }, {
        id: 'manufacturer',
        title: 'Manufacturer',
        placeholder: 'Filter by Manufacturer...',
        type: FilterType.TEXT
      }, {
        id: 'type',
        title: 'Type',
        placeholder: 'Filter by Type...',
        type: FilterType.TEXT
      }] as FilterField[],
      appliedFilters: [],
      resultsCount: this.rows.length,
      totalCount: this.allRows.length
    } as FilterConfig;

    this.sortConfig = {
      fields: [{
        id: 'name',
        title: 'Name',
        sortType: 'alpha'
      }, {
        id: 'zip',
        title: 'ZIP',
        sortType: 'alpha'
      }, {
        id: 'community',
        title: 'Community',
        sortType: 'alpha'
      }, {
        id: 'district',
        title: 'District',
        sortType: 'alpha'
      }, {
        id: 'province',
        title: 'Province',
        sortType: 'alpha'
      }, {
        id: 'manufacturer',
        title: 'Manufacturer',
        sortType: 'alpha'
      }, {
        id: 'type',
        title: 'Type',
        sortType: 'alpha'
      }],
      isAscending: this.isAscendingSort
    } as SortConfig;

    this.emptyStateConfig = {
      iconStyleClass: 'pficon-warning-triangle-o',
      title: 'No stations found. Please create a station'
    } as EmptyStateConfig;

    this.toolbarConfig = {
      filterConfig: this.filterConfig,
      sortConfig: this.sortConfig
    } as ToolbarConfig;

    this.tableConfig = {
      emptyStateConfig: this.emptyStateConfig,
      paginationConfig: this.paginationConfig,
      showCheckbox: false,
      toolbarConfig: this.toolbarConfig
    } as TableConfig;
  }

  // Actions

  doAdd(): void {
    this.actionsText = 'Add Action\n' + this.actionsText;
  }

  handleAction(action: Action): void {
    this.actionsText = action.title + '\n' + this.actionsText;
  }

  optionSelected(option: number): void {
    this.actionsText = 'Option ' + option + ' selected\n' + this.actionsText;
  }

  // Filter

  applyFilters(filters: Filter[]): void {
    this.filteredRows = [];
    if (filters && filters.length > 0) {
      this.allRows.forEach((item) => {
        if (this.matchesFilters(item, filters)) {
          this.filteredRows.push(item);
        }
      });
    } else {
      this.filteredRows = this.allRows;
    }
    this.toolbarConfig.filterConfig.resultsCount = this.filteredRows.length;
    this.updateRows(true);
  }

  // Handle filter changes
  filterChanged($event: FilterEvent): void {
    this.filtersText = '';
    $event.appliedFilters.forEach((filter) => {
      this.filtersText += filter.field.title + ' : ' + filter.value + '\n';
    });
    this.applyFilters($event.appliedFilters);
  }

  matchesFilter(item: any, filter: Filter): boolean {
    let match = true;
    const re = new RegExp(filter.value, 'i');
    if (filter.field.id === 'name') {
      match = item.name.match(re) !== null;
    } else if (filter.field.id === 'zip') {
      match = item.zip.match(re) !== null;
    } else if (filter.field.id === 'community') {
      match = item.community.match(re) !== null;
    } else if (filter.field.id === 'district') {
      match = item.district.match(re) !== null;
    } else if (filter.field.id === 'province') {
      match = item.province.match(re) !== null;
    } else if (filter.field.id === 'manufacturer') {
      match = item.manufacturer.match(re) !== null;
    } else if (filter.field.id === 'type') {
      match = item.type.match(re) !== null;
    }
    return match;
  }

  matchesFilters(item: any, filters: Filter[]): boolean {
    let matches = true;
    filters.forEach((filter) => {
      if (!this.matchesFilter(item, filter)) {
        matches = false;
        return matches;
      }
    });
    return matches;
  }

  // Drag and drop

  handleDrop($event: any[]): void {
    // Save new row order
    const startIndex = (this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize;
    const endIndex = startIndex + this.paginationConfig.pageSize;
    for (let i = startIndex; i < endIndex; i++) {
      this.allRows[i] = $event[i];
    }
    this.actionsText = 'Row dropped' + '\n' + this.actionsText;
  }

  // ngx-datatable

  handleOnActivate($event: any): void {
    // To much noise
    // this.actionsText = 'Cell or row focused' + '\n' + this.actionsText;
  }

  handleOnReorder($event: any): void {
    this.actionsText = 'Columns reordered' + '\n' + this.actionsText;
  }

  handleOnResize($event: any): void {
    this.actionsText = 'Columns resized' + '\n' + this.actionsText;
  }

  handleOnScroll($event: any): void {
    this.actionsText = 'Body scrolled' + '\n' + this.actionsText;
  }

  // Pagination

  handlePageSize($event: PaginationEvent): void {
    this.actionsText = 'Page Size: ' + $event.pageSize + ' Selected' + '\n' + this.actionsText;
    this.updateRows(false);
  }

  handlePageNumber($event: PaginationEvent): void {
    this.actionsText = 'Page Number: ' + $event.pageNumber + ' Selected' + '\n' + this.actionsText;
    this.updateRows(false);
  }

  updateRows(reset: boolean): void {
    if (reset) {
      this.paginationConfig.pageNumber = 1;
    }
    this.paginationConfig.totalItems = this.filteredRows.length;
    this.rows = this.filteredRows.slice((this.paginationConfig.pageNumber - 1) * this.paginationConfig.pageSize,
      this.paginationConfig.totalItems).slice(0, this.paginationConfig.pageSize);
  }

  // Sort

  compare(item1: any, item2: any): number {
    let compValue = 0;
    if (this.currentSortField.id === 'name') {
      compValue = item1.name.localeCompare(item2.name);
    } else if (this.currentSortField.id === 'zip') {
      compValue = item1.zip.localeCompare(item2.zip);
    } else if (this.currentSortField.id === 'community') {
      compValue = item1.community.localeCompare(item2.community);
    } else if (this.currentSortField.id === 'district') {
      compValue = item1.district.localeCompare(item2.community);
    } else if (this.currentSortField.id === 'province') {
      compValue = item1.province.localeCompare(item2.community);
    } else if (this.currentSortField.id === 'manufacturer') {
      compValue = item1.manufacturer.localeCompare(item2.manufacturer);
    } else if (this.currentSortField.id === 'type') {
      compValue = item1.type.localeCompare(item2.type);
    }

    if (!this.isAscendingSort) {
      compValue = compValue * -1;
    }
    return compValue;
  }

  // Handle sort changes
  handleSortChanged($event: SortEvent): void {
    this.currentSortField = $event.field;
    this.isAscendingSort = $event.isAscending;
    this.allRows.sort((item1: any, item2: any) => this.compare(item1, item2));
    this.applyFilters(this.filterConfig.appliedFilters || []);
  }

  // Selection

  handleSelectionChange($event: TableEvent): void {
    this.actionsText = $event.selectedRows.length + ' rows selected\r\n' + this.actionsText;
  }

  updateItemsAvailable(): void {
    if (this.rowsAvailable) {
      this.toolbarConfig.filterConfig.totalCount = this.allRows.length;
      this.filteredRows = this.allRows;
      this.updateRows(false);
    } else {
      // Clear previously applied properties to simulate no rows available
      this.toolbarConfig.filterConfig.totalCount = 0;
      this.filterConfig.appliedFilters = [];
      this.rows = [];
    }
  }

  initData() {

    this.stationCommunication.getAll().subscribe(x => this.addListEntrys(x));

  }

  addListEntrys(stations: Station[]) {
    const stationsFiltered: Station[] = stations.filter(x => x.user.id === this.user.id);
    this.allRows = [];
    this.filteredRows = [];
    this.rows = [];
    for (const s of stationsFiltered) {
      this.allRows.push({
        name: s.name,
        zip: s.community.zipCode.toFixed(),
        community: s.community.name,
        district: s.district.name,
        province: s.province.name,
        manufacturer: s.stationType.manufacturer,
        type: s.stationType.model,
        id: s.id
      });
    }
    this.filteredRows = this.allRows;
    this.updateRows(false);
  }


}
