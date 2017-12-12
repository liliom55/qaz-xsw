import { TestBed, inject } from '@angular/core/testing';

import { CustomRoutingService } from './custom-routing.service';

describe('CustomRoutingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomRoutingService]
    });
  });

  it('should service works well', inject([CustomRoutingService], (service: CustomRoutingService) => {
    expect(service).toBeTruthy();
  }));
});
