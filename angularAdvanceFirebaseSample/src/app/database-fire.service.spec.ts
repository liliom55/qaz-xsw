import { TestBed, inject } from '@angular/core/testing';

import { DatabaseFireService } from './database-fire.service';

describe('DatabaseFireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseFireService]
    });
  });

  it('should ...', inject([DatabaseFireService], (service: DatabaseFireService) => {
    expect(service).toBeTruthy();
  }));
});
