import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WetrCommunication} from '../shared/wetr-communication.service';
import Station = WetrCommunication.Station;

@Component({
  selector: 'wea5-wetr-search-community',
  templateUrl: './wetr-search-community.component.html',
  styles: []
})
export class WetrSearchCommunityComponent implements OnInit {

  Stations: Station[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private stationsComm: WetrCommunication.StationsClient) { }

  ngOnInit() {
    this.stationsComm.getByCommunityId(Number(this.route.snapshot.paramMap.get('id'))).subscribe(x => this.initStations(x));
    this.route.paramMap.subscribe(params => this.onParamChange(Number(params.get('id'))));
  }

  onParamChange(x: number) {
    this.stationsComm.getByCommunityId(x).subscribe(y => this.initStations(y));
  }

  initStations(x: Station[]) {
    this.Stations = x;
  }

}
