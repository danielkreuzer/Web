import { Component, OnInit } from '@angular/core';
import {WetrCommunication} from '../shared/wetr-communication.service';
import {Router} from '@angular/router';
import LoginDetails = WetrCommunication.LoginDetails;
import User = WetrCommunication.User;
import {AuthenticationService} from '../shared/authentication.service';
import {WetrAuthenticationService} from '../shared/wetr-authentication.service';
import OAuthLoginDetails = WetrCommunication.OAuthLoginDetails;
import {WetrNotificationServiceService} from '../shared/wetr-notification-service.service';

@Component({
  selector: 'wea5-wetr-login',
  templateUrl: './wetr-login.component.html',
  styles: []
})
export class WetrLoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private loginCommunicator: WetrCommunication.UsersClient,
              private router: Router,
              private OAuthService: AuthenticationService,
              private wetrAuth: WetrAuthenticationService,
              private errorMsg: WetrNotificationServiceService) { }

  ngOnInit() {
    this.checkIfAlreadyLoggedIn();
  }

  handleLogin() {
    const ld: LoginDetails = {
      username: this.username,
      password: this.password
    } as LoginDetails;
    this.loginCommunicator.checkLogin(ld).subscribe(x => this.handleUserSave(x));
  }

  handleUserSave(user: User) {
    if (user != null) {
      this.wetrAuth.addActualUser(user);
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.router.navigate(['/settings']);
    } else {
      this.errorMsg.messageFailure('Login', 'Login failed, try again!');
    }
  }

  checkIfAlreadyLoggedIn() {
    if (this.wetrAuth.getActualUser() != null) {
      this.router.navigate(['/settings']);
    } else {
      if (this.OAuthService.isLoggedIn()) {
        const claims = this.OAuthService.getDetails();
        const details: OAuthLoginDetails = {
          email: claims.email,
          given_name: claims.given_name,
          family_name: claims.family_name
        } as OAuthLoginDetails;
        this.loginCommunicator.checkOAuthLogin(details).subscribe(x => this.handleUserSave(x));
      }
    }
  }

  handleLoginOAuth() {
    this.OAuthService.login(this.username, this.password);
  }
}
