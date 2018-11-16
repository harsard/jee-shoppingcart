import { TestBed, inject } from '@angular/core/testing';

import { WaitingTimeService } from './waiting-time.service';

describe('WaitingTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaitingTimeService]
    });
  });

  it('should be created', inject([WaitingTimeService], (service: WaitingTimeService) => {
    expect(service).toBeTruthy();
  }));
});
