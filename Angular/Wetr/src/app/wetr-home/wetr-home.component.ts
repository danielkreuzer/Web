import { Component, OnInit } from '@angular/core';
import {WetrCommunication} from '../shared/wetr-communication.service';
import {WetrPersonalicationService} from '../shared/wetr-personalication.service';

class FavouriteHelper {
  public stations: number;
  public queryMode: number;

  constructor(stations: number, queryMode: number) {
    this.stations = stations;
    this.queryMode = queryMode;
  }
}

@Component({
  selector: 'wea5-wetr-home',
  templateUrl: './wetr-home.component.html',
  styles: []
})
export class WetrHomeComponent implements OnInit {

  Favourites: Number[];
  queryMode = 0;

  constructor(private pers: WetrPersonalicationService) { }

  ngOnInit() {
    this.Favourites = this.pers.getFavourites();
    this.pers.onChange.subscribe(x => this.refresh(x));
  }

  refresh(x: boolean) {
    this.Favourites = this.pers.getFavourites();
  }

}
