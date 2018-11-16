import { TestBed, inject } from '@angular/core/testing';

import { ExtraMileChargeService } from './extra-mile-charge.service';

describe('ExtraMileChargeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtraMileChargeService]
    });
  });

  it('should be created', inject([ExtraMileChargeService], (service: ExtraMileChargeService) => {
    expect(service).toBeTruthy();
  }));
});
