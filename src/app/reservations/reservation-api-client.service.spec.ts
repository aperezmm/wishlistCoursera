import { TestBed } from '@angular/core/testing';

import { ReservationApiClientService } from './reservation-api-client.service';

describe('ReservationApiClientService', () => {
  let service: ReservationApiClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationApiClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
