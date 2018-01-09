import { TestBed, inject } from '@angular/core/testing';

import { ArrayformService } from './arrayform.service';

describe('ArrayformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArrayformService]
    });
  });

  it('should be created', inject([ArrayformService], (service: ArrayformService) => {
    expect(service).toBeTruthy();
  }));
});
