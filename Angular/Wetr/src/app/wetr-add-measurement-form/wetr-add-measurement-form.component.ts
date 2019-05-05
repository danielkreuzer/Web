import { Component, OnInit } from '@angular/core';
import {CardConfig} from 'patternfly-ng';
import {WetrAuthenticationService} from '../shared/wetr-authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {WetrCommunication} from '../shared/wetr-communication.service';
import Unit = WetrCommunication.Unit;
import MeasurementType = WetrCommunication.MeasurementType;
import Station = WetrCommunication.Station;
import Measurement = WetrCommunication.Measurement;
import {WetrNotificationServiceService} from '../shared/wetr-notification-service.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'wea5-wetr-add-measurement-form',
  templateUrl: './wetr-add-measurement-form.component.html',
  styles: []
})
export class WetrAddMeasurementFormComponent implements OnInit {

  stationName: String;
  actualStation: Station;

  measurementValue: Number = null;
  typeId: Number = 1;
  unitId: Number = 1;
  dateTime: Date = new Date();
  hour: Number = 0;
  minute: Number = 0;
  secound: Number = 0;

  unitArr: Unit[];
  typeArr: MeasurementType[];

  constructor(private wetrAuth: WetrAuthenticationService,
              private router: Router,
              private stationCommunication: WetrCommunication.StationsClient,
              private measurementCommunication: WetrCommunication.MeasurementsClient,
              private route: ActivatedRoute,
              private measurementTypesCommunication: WetrCommunication.MeasurementTypesClient,
              private errorMsg: WetrNotificationServiceService) { }

  ngOnInit() {
    this.checkIfAllowed();
  }

  checkIfAllowed() {
    if (this.wetrAuth.getActualUser() == null) {
      this.router.navigate(['/login']);
    } else {
      this.initArrays();
    }
  }

  initArrays() {
    this.stationCommunication.getById(Number(this.route.snapshot.paramMap.get('id'))).subscribe(x => {this.actualStation = x; this.stationName = x.name; });
    this.measurementCommunication.getAllUnits().subscribe(x => this.unitArr = x);
    this.measurementTypesCommunication.getAll().subscribe(x => this.typeArr = x);
  }

  cancel() {
    this.router.navigate(['/settings']);
  }

  addMeasurement() {
    if (this.getMeasurementFromInput() != null) {
      this.measurementCommunication.insert(this.getMeasurementFromInput()).subscribe(x => this.errorMessage('Add', true, x));
    } else {
      this.errorMessage('Add', false, false);
    }
  }

  getMeasurementFromInput(): Measurement {
    if (this.measurementValue != null) {
      const measurement = new Measurement();
      measurement.value = Number(this.measurementValue);
      measurement.stationId = this.actualStation.id;
      measurement.typeId = Number(this.typeId);
      measurement.unitId = Number(this.unitId);
      measurement.timestamp = this.dateTime;
      measurement.timestamp.setHours(Number(this.hour));
      measurement.timestamp.setMinutes(Number(this.minute));
      measurement.timestamp.setSeconds(Number(this.secound));
      return measurement;
    } else {
      return null;
    }

  }

  errorMessage(message: String, redirect: boolean, success: boolean) {
      if (!success) {
        this.errorMsg.messageFailure(message + ' failed!', '');
      } else {
        this.errorMsg.messageSuccess(message + ' success!', '');
        if (redirect) {
          this.router.navigate(['/settings']);
        }
      }
    }
}
