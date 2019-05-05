import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  Action,
  ActionConfig,
  CardConfig,
  EmptyStateConfig, Filter,
  FilterConfig, FilterEvent, FilterField, FilterType,
  PaginationConfig, PaginationEvent,
  SortConfig, SortEvent,
  SortField,
  TableConfig, TableEvent, ToolbarConfig
} from 'patternfly-ng';
import { Chart } from 'chart.js';
import {Point} from 'chart.js';
import {ActivatedRoute, Router} from '@angular/router';
import {WetrCommunication} from '../shared/wetr-communication.service';
import Station = WetrCommunication.Station;

import DateTimeFormat = Intl.DateTimeFormat;
import MeasurementAnalytic = WetrCommunication.MeasurementAnalytic;
import Measurement = WetrCommunication.Measurement;
import {WetrNotificationServiceService} from '../shared/wetr-notification-service.service';
import {WetrPersonalicationService} from '../shared/wetr-personalication.service';
import {PersonalisationDetails} from '../shared/PersonalisationDetails';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'wea5-wetr-station',
  templateUrl: './wetr-station.component.html',
  styles: []
})



export class WetrStationComponent implements OnInit {

  // Global Vars
  id = 47;
  station: Station;

  // Chart
  chart: Chart = null;
  labelArr: String[] = [];
  dataArr: String[] = [];
  dataTableArr = [];

  unitDisplayed: String = '';

  // Form

  startDate: Date = new Date();
  endDate: Date = new Date();

  graphSettings: any = {
    groupBy: '1',
    calculateBy: '0',
    type: 'no'
  };

  selectedUnit: Number = 0;
  shour: Number = 0;
  sminute: Number = 0;
  ssecound: Number = 0;
  ehour: Number = 0;
  eminute: Number = 0;
  esecound: Number = 0;

  // Station Details
  stationName = '';
  stationLocation = '';
  stationZip = '';
  stationType = '';
  stationManufacturer = '';
  stationAltitude = '';
  stationCreator = '';
  stationDistrict = '';
  stationProvince = '';
  stationLongitude = '';
  stationLatitude = '';

  // table
  actionConfig: ActionConfig;
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

  @ViewChild('valueTemplate') valueTemplate: TemplateRef<any>;
  @ViewChild('timeTemplate') timeTemplate: TemplateRef<any>;

  config: CardConfig;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private stationConnector: WetrCommunication.StationsClient,
              private measurementsConnector: WetrCommunication.MeasurementsClient,
              private errorMsg: WetrNotificationServiceService,
              private pers: WetrPersonalicationService) { }

  ngOnInit() {
    this.initTable();

    try {
      this.id = Number(this.route.snapshot.paramMap.get('id'));
    } catch (e) {
      this.id = 47;
    }
    this.showGraph();
    this.stationConnector.getById(this.id).subscribe(x => this.initStationDetails(x));

  }

  initPersonalisedData() {
    if (this.pers.getPersonalisation() != null) {
      const p: PersonalisationDetails = this.pers.getPersonalisation();
      this.startDate = new Date(p.startDate);
      this.endDate = new Date(p.endDate);
      this.ssecound = this.startDate.getSeconds();
      this.sminute = this.startDate.getMinutes();
      this.shour  = this.startDate.getHours();
      this.esecound = this.endDate.getSeconds();
      this.eminute = this.endDate.getMinutes();
      this.ehour  = this.endDate.getHours();
      this.graphSettings.groupBy = p.groupBy;
      this.graphSettings.calculateBy = p.calculateBy;
      this.graphSettings.type = p.type;
      this.selectedUnit = p.unit;
      this.graphButtonClicked();
    }
  }

  showGraph() {
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.chart = new Chart('chartDetails', {
      type: 'line',
      data: {
        labels: this.labelArr,
        datasets: [{
          label: 'measurements',
          borderColor: '#002f6c',
          pointBorderColor: '#002f6c',
          pointBackgroundColor: '#002f6c',
          pointHoverBackgroundColor: '#002f6c',
          pointHoverBorderColor: '#002f6c',
          pointBorderWidth: 5,
          pointHoverRadius: 5,
          pointHoverBorderWidth: 1,
          pointRadius: 1,
          fill: false,
          borderWidth: 1,
          data: this.dataArr
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        scales: {
          xAxes: [{
            display: true // this will remove all the x-axis grid lines
          }],
          yAxes: [{
            display: true // this will remove all the x-axis grid lines
          }]
        }
      }
    });
  }

  initStationDetails(stationReceived: Station) {
    this.station = stationReceived;
    this.stationName = this.station.name;
    this.stationLocation = this.station.community.name;
    this.stationZip = String(this.station.community.zipCode);
    this.stationType = this.station.stationType.model;
    this.stationManufacturer = this.station.stationType.manufacturer;
    this.stationAltitude = String(this.station.altitude);
    this.stationLongitude = String(this.station.longitude);
    this.stationLatitude = String(this.station.latitude);
    this.stationCreator = this.station.user.firstName + ' ' + this.station.user.lastName;
    this.stationDistrict = this.station.district.name;
    this.stationProvince = this.station.province.name;
    this.initPersonalisedData();
  }

  openGMaps() {
    window.open('https://maps.google.com/?q=' + this.stationLatitude + ',' + this.stationLongitude, '_blank');
  }

  graphButtonClicked() {
    if (this.checkGraphSettingsInput()) {
      if (this.graphSettings.type === 'sum') {
        this.measurementsConnector.getMeasurementsSum(this.startDate.toLocaleString(),
          this.endDate.toLocaleString(),
          this.graphSettings.calculateBy,
          this.graphSettings.groupBy,
          this.station.id).subscribe(x => this.initGraph(x));
      }
      if (this.graphSettings.type === 'avg') {
        this.measurementsConnector.getMeasurementsAvg(this.startDate.toLocaleString(),
          this.endDate.toLocaleString(),
          this.graphSettings.calculateBy,
          this.graphSettings.groupBy,
          this.station.id).subscribe(x => this.initGraph(x));
      }
      if (this.graphSettings.type === 'min') {
        this.measurementsConnector.getMeasurementsMin(this.startDate.toLocaleString(),
          this.endDate.toLocaleString(),
          this.graphSettings.calculateBy,
          this.graphSettings.groupBy,
          this.station.id).subscribe(x => this.initGraph(x));
      }
      if (this.graphSettings.type === 'max') {
        this.measurementsConnector.getMeasurementsMax(this.startDate.toLocaleString(),
          this.endDate.toLocaleString(),
          this.graphSettings.calculateBy,
          this.graphSettings.groupBy,
          this.station.id).subscribe(x => this.initGraph(x));
      }
      if (this.graphSettings.type === 'no') {
        this.measurementsConnector.getMeasurementsForStation(this.startDate.toLocaleString(),
          this.endDate.toLocaleString(), this.graphSettings.calculateBy,
          this.station.id).subscribe(x => this.initGraphMeasurement(x));
      }
    } else {
      this.errorMsg.messageFailure('Failure', 'Check input!');
    }
  }

  private initGraphMeasurement(m: Measurement[]) {
    this.dataArr = [];
    this.labelArr = [];
    this.dataTableArr = [];
    const test: boolean = Number(this.selectedUnit) === 1;
    for (const ma of m) {
      if (test) {
        this.dataArr.push(String((ma.value * 9 / 5) + 32.0));
      } else {
        this.dataArr.push(String(ma.value));
      }

      this.labelArr.push(ma.timestamp.getMonth() + '/' + ma.timestamp.getDay() + '/' + ma.timestamp.getFullYear() + ' '
        + ma.timestamp.getHours() + ':' + ma.timestamp.getMinutes() + ':' + ma.timestamp.getSeconds());
      this.dataTableArr.push({value: ma.value, time: ma.timestamp.getMonth() + '/' + ma.timestamp.getDay() + '/'
          + ma.timestamp.getFullYear() + ' ' + ma.timestamp.getHours() + ':' + ma.timestamp.getMinutes()
          + ':' + ma.timestamp.getSeconds()});
    }
    if (this.dataArr.length === 0) {
      this.errorMsg.messageWarning('Info', 'Nothing found');
    }
    this.DisplayUnit();
    this.showGraph();
    this.updateTableEntrys();
  }

  private initGraph(m: MeasurementAnalytic[]) {
    if (m != null) {
      this.dataArr = [];
      this.labelArr = [];
      this.dataTableArr = [];
      const test: boolean = Number(this.selectedUnit) === 1;
      for (const ma of m) {
        if (test) {
          this.dataArr.push(String((ma.value * 9 / 5) + 32.0));
        } else {
          this.dataArr.push(String(ma.value));
        }

        this.labelArr.push(ma.month + '/' + ma.day + '/' + ma.year + ' ' + ma.hour + ':00');
        this.dataTableArr.push({value: ma.value, time: ma.month + '/' + ma.day + '/' + ma.year + ' ' + ma.hour + ':00'});
      }
      if (this.dataArr.length === 0) {
        this.errorMsg.messageWarning('Info', 'Nothing found');
      }

      this.DisplayUnit();
      this.showGraph();
      this.updateTableEntrys();
    } else {
      this.errorMsg.messageFailure('Failure', 'Check input!');
    }
  }

  DisplayUnit() {
    if (Number(this.graphSettings.calculateBy) === 0) {
      if (Number(this.selectedUnit) === 0) {
        this.unitDisplayed = '[°C]';
      } else {
        this.unitDisplayed = '[°F]';
      }
    }
    if (Number(this.graphSettings.calculateBy) === 1) {
      this.unitDisplayed = '[hPa]';
    }
    if (Number(this.graphSettings.calculateBy) === 2) {
      this.unitDisplayed = '[l/m²]';
    }
    if (Number(this.graphSettings.calculateBy) === 3) {
      this.unitDisplayed = '[%]';
    }
    if (Number(this.graphSettings.calculateBy) === 4) {
      this.unitDisplayed = '[km/h]';
    }
  }

  private checkGraphSettingsInput(): boolean {
    this.startDate.setHours(Number(this.shour));
    this.startDate.setMinutes(Number(this.sminute));
    this.endDate.setHours(Number(this.ehour));
    this.startDate.setSeconds(Number(this.ssecound));
    this.endDate.setMinutes(Number(this.eminute));
    this.endDate.setSeconds(Number(this.esecound));
    return this.graphSettings != null &&
        this.startDate < this.endDate &&
        this.graphSettings.type !== '' &&
        this.graphSettings.calculateBy !== '' &&
        this.graphSettings.groupBy !== '' ;

  }

  updateTableEntrys() {
    this.rows = [];
    this.allRows = [];
    this.filteredRows = [];
    console.log(this.allRows);
    console.log(this.dataTableArr);
      for (const s of this.dataTableArr) {
        this.allRows.push({
          value: String(s.value),
          time: s.time
        });
      }
    this.updateRows(true);
    this.updateItemsAvailable();
  }

  addToFavourites() {
    this.pers.addFavourite(this.station.id);
  }

  saveButtonClicked() {
    if (this.checkGraphSettingsInput()) {
      const pers: PersonalisationDetails = new PersonalisationDetails();
      pers.startDate = this.startDate;
      pers.endDate = this.endDate;
      pers.calculateBy = this.graphSettings.calculateBy;
      pers.groupBy = this.graphSettings.groupBy;
      pers.type = this.graphSettings.type;
      pers.unit = this.selectedUnit;
      this.pers.savePersonalisation(pers);
      this.errorMsg.messageSuccess('Personalisation', 'Data saved!');
    } else {
      this.errorMsg.messageFailure('Failure', 'Check input!');
    }
  }

  // -----------------------------------------------------------------
  // ------------------ TABLE SECTION --------------------------------
  // -----------------------------------------------------------------

  initTable() {
    this.columns = [{
      cellTemplate: this.valueTemplate,
      draggable: true,
      prop: 'value',
      name: 'Value',
      resizeable: true,
      sortable: false // using sort menu
    }, {
      cellTemplate: this.timeTemplate,
      draggable: true,
      prop: 'time',
      name: 'Time',
      resizeable: true,
      sortable: false // using sort menu
    }];

    this.paginationConfig = {
      pageNumber: 1,
      pageSize: 25,
      pageSizeIncrements: [25, 50, 100],
      totalItems: this.filteredRows.length
    } as PaginationConfig;

    // Need to initialize for results/total counts
    this.updateRows(false);

    this.filterConfig = {
      fields: [{
        id: 'value',
        title: 'Value',
        placeholder: 'Filter by Value...',
        type: FilterType.TEXT
      }, {
        id: 'time',
        title: 'Time',
        placeholder: 'Filter by Time...',
        type: FilterType.TEXT
      }] as FilterField[],
      appliedFilters: [],
      resultsCount: this.rows.length,
      totalCount: this.allRows.length
    } as FilterConfig;

    this.sortConfig = {
      fields: [{
        id: 'value',
        title: 'Value',
        sortType: 'alpha'
      }, {
        id: 'time',
        title: 'Time',
        sortType: 'alpha'
      }],
      isAscending: this.isAscendingSort
    } as SortConfig;

    this.emptyStateConfig = {
      iconStyleClass: 'pficon-warning-triangle-o',
      title: 'Nothing found, check input!'
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
    if (filter.field.id === 'value') {
      match = item.value.match(re) !== null;
    } else if (filter.field.id === 'time') {
      match = item.time.match(re) !== null;
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
    if (this.currentSortField.id === 'value') {
      compValue = item1.value.localeCompare(item2.name);
    } else if (this.currentSortField.id === 'time') {
      compValue = item1.time.localeCompare(item2.zip);
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
    // this.actionsText = $event.selectedRows.length + ' rows selected\r\n' + this.actionsText;
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
}
