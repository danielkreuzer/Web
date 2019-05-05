import { Injectable } from '@angular/core';
import {WetrNotificationServiceService} from './wetr-notification-service.service';
import {Subject} from 'rxjs';
import {WetrAuthenticationService} from './wetr-authentication.service';
import {PersonalisationDetails} from './PersonalisationDetails';

@Injectable({
  providedIn: 'root'
})

export class WetrPersonalicationService {

  favStore = 'Favourites';
  persStore = 'Pers';

  private change = false;
  onChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private errorMsg: WetrNotificationServiceService,
    private auth: WetrAuthenticationService
  ) { }

  public addFavourite(stationId: Number) {
    if (this.auth.getActualUser() != null) {
      this.favStore = String('Favourites' + this.auth.getActualUser());
    } else {
      this.favStore = 'Favourites';
    }
    if (localStorage.getItem(this.favStore)) {
      const fArray: Number[] = JSON.parse(localStorage.getItem(this.favStore));
      if (fArray.includes(stationId)) {
        this.errorMsg.messageWarning('Favourites', 'This station is already a favourite');
      } else {
        fArray.push(stationId);
        localStorage.setItem(this.favStore, JSON.stringify(fArray));
        this.errorMsg.messageSuccess('Favourites', 'Station added');
      }
    } else {
      const fArray: Number[] = [];
      fArray.push(stationId);
      localStorage.setItem(this.favStore, JSON.stringify(fArray));
      this.errorMsg.messageSuccess('Favourites', 'Station added');
    }
    this.onChange.next(!this.change);
  }

  public getFavourites(): Number[] {
    if (this.auth.getActualUser() != null) {
      this.favStore = String('Favourites' + this.auth.getActualUser());
    } else {
      this.favStore = 'Favourites';
    }
    if (localStorage.getItem(this.favStore)) {
      const fArray: Number[] = JSON.parse(localStorage.getItem(this.favStore));
      if (fArray.length < 1) {
        return [47];
      } else {
        return fArray;
      }
    } else {
      return [47];
    }
  }

  public removeFavourite(stationId: Number) {
    if (this.auth.getActualUser() != null) {
      this.favStore = String('Favourites' + this.auth.getActualUser());
    } else {
      this.favStore = 'Favourites';
    }
    if (localStorage.getItem(this.favStore)) {
      const fArray: Number[] = JSON.parse(localStorage.getItem(this.favStore));
      if (fArray.includes(stationId)) {
        const fArrayNew: Number[] = [];
        for (const x of fArray) {
          if (x !== stationId) {
            fArrayNew.push(x);
          }
        }
        localStorage.setItem(this.favStore, JSON.stringify(fArrayNew));
        this.errorMsg.messageSuccess('Favourites', 'Station deleted');
      } else {
        this.errorMsg.messageWarning('Favourites', 'This station is no favourite');
      }
    } else {
      this.errorMsg.messageWarning('Favourites', 'This station is no favourite');
    }
    this.onChange.next(!this.change);
  }

  // persStore = 'Pers';

  public savePersonalisation(pd: PersonalisationDetails) {
    if (this.auth.getActualUser() != null) {
      this.persStore = String('Pers' + this.auth.getActualUser());
    } else {
      this.persStore = 'Pers';
    }
    localStorage.setItem(this.persStore, JSON.stringify(pd));
  }

  public getPersonalisation(): PersonalisationDetails {
    if (this.auth.getActualUser() != null) {
      this.persStore = String('Pers' + this.auth.getActualUser());
    } else {
      this.persStore = 'Pers';
    }
    if (localStorage.getItem(this.persStore)) {
      const returnVal: PersonalisationDetails = JSON.parse(localStorage.getItem(this.persStore));
      return returnVal;
    } else {
      return null;
    }
  }

  public convertToFahrenheit(x: number): number {
    return (x * 9 / 5) + 32.0;
  }
}
