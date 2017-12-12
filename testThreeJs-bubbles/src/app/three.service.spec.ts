import { TestBed, inject } from '@angular/core/testing';

import { ThreeService } from './three.service';

describe('ThreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThreeService]
    });
  });

  it('should ...', inject([ThreeService], (service: ThreeService) => {
    expect(service).toBeTruthy();
  }));
});
