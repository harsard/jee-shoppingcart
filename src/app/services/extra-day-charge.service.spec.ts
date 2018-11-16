import { TestBed, inject } from '@angular/core/testing';

import { ExtraDayChargeService } from './extra-day-charge.service';

describe('ExtraDayChargeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtraDayChargeService]
    });
  });

  it('should be created', inject([ExtraDayChargeService], (service: ExtraDayChargeService) => {
    expect(service).toBeTruthy();
  }));
});
