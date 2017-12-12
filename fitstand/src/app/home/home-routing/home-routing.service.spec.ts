import { TestBed, inject } from '@angular/core/testing';

import { HomeRoutingService } from './home-routing.service';

describe('HomeRoutingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeRoutingService]
    });
  });

  it('should ...', inject([HomeRoutingService], (service: HomeRoutingService) => {
    expect(service).toBeTruthy();
  }));
});
