import { TestBed, inject } from '@angular/core/testing';

import { WetrPersonalicationService } from './wetr-personalication.service';

describe('WetrPersonalicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WetrPersonalicationService]
    });
  });

  it('should be created', inject([WetrPersonalicationService], (service: WetrPersonalicationService) => {
    expect(service).toBeTruthy();
  }));
});
