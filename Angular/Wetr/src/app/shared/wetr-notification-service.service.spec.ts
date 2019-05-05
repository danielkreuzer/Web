import { TestBed, inject } from '@angular/core/testing';

import { WetrNotificationServiceService } from './wetr-notification-service.service';

describe('WetrNotificationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WetrNotificationServiceService]
    });
  });

  it('should be created', inject([WetrNotificationServiceService], (service: WetrNotificationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
