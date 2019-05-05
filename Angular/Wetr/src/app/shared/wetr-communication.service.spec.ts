import { TestBed, inject } from '@angular/core/testing';

import { WetrCommunicationService } from './wetr-communication.service';

describe('WetrCommunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WetrCommunicationService]
    });
  });

  it('should be created', inject([WetrCommunicationService], (service: WetrCommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
