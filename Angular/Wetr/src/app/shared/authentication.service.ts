import { Injectable } from '@angular/core';
import {JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './auth.config';
import {WetrCommunication} from './wetr-communication.service';
import OAuthLoginDetails = WetrCommunication.OAuthLoginDetails;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private oAuthService: OAuthService) {
    this.configureWithNewConfigApi();
  }

  private configureWithNewConfigApi() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      // console.log(this.oAuthService.getIdentityClaims());
      // console.log(JSON.stringify(this.oAuthService.getIdentityClaims()));
      // todo: send identityClaims to WetrWeb
    });
  }

  public login(email: string, password: string): boolean {
    this.oAuthService.initImplicitFlow();
    return true;
  }

  public isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken() && this.oAuthService.hasValidIdToken();
  }

  public getDetails(): any {
    const claims = this.oAuthService.getIdentityClaims();
    if (!claims) { return null; }
    return claims;
  }

  public logoff() {
    this.oAuthService.logOut();
  }
}
