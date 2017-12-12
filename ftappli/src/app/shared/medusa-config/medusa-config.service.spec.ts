import { TestBed, inject } from '@angular/core/testing';

import { MedusaConfigService } from './medusa-config.service';

describe('MedusaConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedusaConfigService]
    });
  });

  it('should be created', inject([MedusaConfigService], (service: MedusaConfigService) => {
    expect(service).toBeTruthy();
  }));
});
