import {Component, Input, OnInit} from '@angular/core';
import {WetrCommunication} from '../shared/wetr-communication.service';
import Station = WetrCommunication.Station;
import Measurement = WetrCommunication.Measurement;
import {CardConfig} from 'patternfly-ng/card/basic-card/card-config';
import {CardAction, SparklineChartConfig, SparklineChartData} from 'patternfly-ng';
import { Chart } from 'chart.js';
import {Point} from 'chart.js';
import {connectableObservableDescriptor} from 'rxjs/internal/observable/ConnectableObservable';
import {color} from 'd3-color';
import {WetrPersonalicationService} from '../shared/wetr-personalication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'wea5-wetr-favourite-item',
  templateUrl: './wetr-favourite-item.component.html',
  styles: []
})
export class WetrFavouriteItemComponent implements OnInit {

  @Input() queryMode: number;
  @Input() stationId: number;

  station: Station;
  measurements: Measurement[];
  config: CardConfig;
  chartId: String;
  collapseId: String;
  collapseId2: String;
  arrowType: String;
  chart = [];
  chartData: SparklineChartData;
  chartConfig: SparklineChartConfig;

  // Content Strings
  temperature = 'no measurements found!';
  temperatureTime: string;
  stationLocation: string;
  stationZipCode: string;
  stationType: string;
  stationManufactorer: string;
  stationName: string;


  constructor(private stationController: WetrCommunication.StationsClient,
              private measurementController: WetrCommunication.MeasurementsClient,
              private pers: WetrPersonalicationService,
              private router: Router) { }

  ngOnInit(): void {
    this.chartId = 'StationChart' + this.stationId;
    this.collapseId = 'Collapse' + this.stationId;
    this.collapseId2 = 'data-parent="#Collapsee' + this.stationId + '"';
    this.stationController.getById(this.stationId).subscribe(x => this.initialisationStation(x));
    this.measurementController.getLastMeasurementsForStation(this.queryMode, this.stationId, 10).subscribe(x => this.initialisationContent(x) );


  }

  initialisationStation(s: Station) {
    this.station = s;
    this.config = {
      action: {
        hypertext: 'more...',
        iconStyleClass: 'fa fa-info',
      },
      title: this.station.name
    } as CardConfig;
    this.stationName = this.station.name;
    this.stationLocation = this.station.community.name;
    this.stationZipCode = this.station.community.zipCode.toFixed();
    this.stationType = this.station.stationType.model;
    this.stationManufactorer = this.station.stationType.manufacturer;
  }

  initialisationContent(m: Measurement[]) {
    this.measurements = m;
    if (m != null  && m.length > 2) {
      if (this.pers.getPersonalisation() == null) {
        this.temperature = this.measurements[this.measurements.length - 1].value.toFixed(1) +
          ' ' + this.measurements[this.measurements.length - 1].unit.shortName;
      } else {
        if (Number(this.pers.getPersonalisation().unit) === 0) {
          this.temperature = this.measurements[this.measurements.length - 1].value.toFixed(1) +
            ' ' + this.measurements[this.measurements.length - 1].unit.shortName;
        } else {
          this.temperature = ((this.measurements[this.measurements.length - 1].value * 9 / 5) + 32.0).toFixed(1) + ' °F';
        }
      }

      this.temperatureTime = this.measurements[this.measurements.length - 1].timestamp.toLocaleString();
      this.initialiseGraph();
      this.getTrendIcon();
    }
  }

  initialiseGraph() {

    const dataArr: String[] = [];
    const dataArr2: String[] = [];
    for (const measurement of this.measurements) {
      dataArr.push(measurement.value.toFixed(3));
      dataArr2.push(measurement.timestamp.toLocaleString());
    }

    this.chart = new Chart(this.chartId, {
      type: 'line',
      data: {
        labels: dataArr2,
        datasets: [{
          label: 'last measurements',
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
          data: dataArr
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [{
            display: false // this will remove all the x-axis grid lines
          }],
          yAxes: [{
            display: false // this will remove all the x-axis grid lines
          }]
        }
      }
    });
  }

  getTrendIcon() {
    if (this.measurements[this.measurements.length - 1].value > this.measurements[this.measurements.length - 2].value) {
      this.arrowType = 'fa-arrow-up';
    } else if (this.measurements[this.measurements.length - 1].value < this.measurements[this.measurements.length - 2].value) {
      this.arrowType = 'fa-arrow-down';
    } else {
      this.arrowType = 'fa-arrow-right';
    }
  }

  removeFavourite() {
    this.pers.removeFavourite(this.station.id);
    // this.router.navigate(['/station', param]);
  }

  handleActionSelect($event: CardAction): void {
    this.router.navigate(['/station', this.station.id]);
  }


}

