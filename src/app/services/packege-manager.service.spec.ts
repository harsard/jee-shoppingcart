import { TestBed, inject } from '@angular/core/testing';

import { PackegeManagerService } from './packege-manager.service';

describe('PackegeManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackegeManagerService]
    });
  });

  it('should be created', inject([PackegeManagerService], (service: PackegeManagerService) => {
    expect(service).toBeTruthy();
  }));
});
