import { Component, OnInit } from '@angular/core';
import {CardConfig} from 'patternfly-ng';
import {Router} from '@angular/router';
import {WetrAuthenticationService} from '../shared/wetr-authentication.service';
import {WetrCommunication} from '../shared/wetr-communication.service';
import User = WetrCommunication.User;
import Community = WetrCommunication.Community;
import StationType = WetrCommunication.StationType;
import Station = WetrCommunication.Station;
import {WetrNotificationServiceService} from '../shared/wetr-notification-service.service';

@Component({
  selector: 'wea5-wetr-add-station-form',
  templateUrl: './wetr-add-station-form.component.html',
  styles: []
})
export class WetrAddStationFormComponent implements OnInit {

  user: User;

  // Form
  selectedName: String;
  selectedType: Number;
  selectedCommunity: Number;
  selectedLongitude: String;
  selectedLatitude: String;
  selectedAltitude: String;

  typeArr: StationType[];
  communitiesArr: Community[];

  constructor(private router: Router,
              private wetrAuth: WetrAuthenticationService,
              private stationCommunication: WetrCommunication.StationsClient,
              private userCommunication: WetrCommunication.UsersClient,
              private communitiesCommunication: WetrCommunication.CommunitiesClient,
              private errorMsg: WetrNotificationServiceService) { }

  ngOnInit() {
    this.checkIfAllowed();
    this.initArrays();
  }

  private checkIfAllowed() {
    if (this.wetrAuth.getActualUser() == null) {
      this.router.navigate(['/login']);
    } else {
      this.getActualUser(Number(this.wetrAuth.getActualUser()));
    }
  }

  initArrays() {
    this.communitiesCommunication.getAll().subscribe(x => this.communitiesArr = x);
    this.stationCommunication.getAllTypes().subscribe(x => this.typeArr = x);
  }

  getActualUser(id: number) {
    this.userCommunication.getUserById(id).subscribe(x => this.user = x);
  }

  saveChanges() {
    if (this.checkEntries()) {
      this.stationCommunication.addStation(this.getStationOutOfEntries()).subscribe(x => this.errorMessage(x, 'Add'));
    } else {
      this.errorMessage(false, 'Input');
    }
  }

  getStationOutOfEntries(): Station {
    const station: Station = new Station();
    station.communityId = Number(this.selectedCommunity);
    station.name = String(this.selectedName);
    station.typeId = Number(this.selectedType);
    station.longitude = Number(this.selectedLongitude);
    station.latitude = Number(this.selectedLatitude);
    station.altitude = Number(this.selectedAltitude);
    station.creator = this.user.id;
    return station;
  }

  checkEntries(): boolean {
    const s = this.getStationOutOfEntries();
    return s.name !== '' &&
      s.typeId !== null &&
      s.communityId !== null;
  }

  cancel() {
    this.router.navigate(['/settings']);
  }

  errorMessage(x: boolean, m: String) {
    if (!x) {
      this.errorMsg.messageFailure(m + ' failed!', '');
    } else {
      this.errorMsg.messageSuccess(m + ' success', '')
      this.router.navigate(['/settings']);
    }
  }

}
