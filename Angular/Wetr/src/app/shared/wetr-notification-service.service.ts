import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService, NotificationType} from 'patternfly-ng';

@Injectable({
  providedIn: 'root'
})
export class WetrNotificationServiceService {

  constructor(
    private notificationService: NotificationService) { }

  public messageSuccess(title: String, message: String) {
    this.notificationService.message(
      NotificationType.SUCCESS,
      String(title),
      String(message),
      false,
      null,
      null);
  }

  public messageWarning(title: String, message: String) {
    this.notificationService.message(
      NotificationType.WARNING,
      String(title),
      String(message),
      false,
      null,
      null);
  }

  public messageFailure(title: String, message: String) {
    this.notificationService.message(
      NotificationType.DANGER,
      String(title),
      String(message),
      false,
      null,
      null);
  }

}
