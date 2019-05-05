import { TestBed, inject } from '@angular/core/testing';

import { WetrAuthenticationService } from './wetr-authentication.service';

describe('WetrAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WetrAuthenticationService]
    });
  });

  it('should be created', inject([WetrAuthenticationService], (service: WetrAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
