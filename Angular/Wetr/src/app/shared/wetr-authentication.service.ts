import { Injectable } from '@angular/core';
import {WetrCommunication} from './wetr-communication.service';
import User = WetrCommunication.User;
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WetrAuthenticationService {
  display: Subject<boolean> = new Subject<boolean>();

  constructor(private userCommunicator: WetrCommunication.UsersClient,
              private authentification: AuthenticationService,
              private router: Router) {
  }

  public addActualUser(user: User) {
    this.display.next(true);
    sessionStorage.setItem('actualUser', String(user.id));
  }

  public deleteActualUser() {
    this.display.next(false);
    sessionStorage.removeItem('actualUser');
  }

  public getActualUser(): Number {
    if (sessionStorage.getItem('actualUser')) {
      return Number(sessionStorage.getItem('actualUser'));
    } else {
      return null;
    }
  }

  public Logout() {
    this.deleteActualUser();
    if (this.authentification.isLoggedIn()) {
      this.authentification.logoff();
    }
    this.router.navigate(['/home']);
  }

}
