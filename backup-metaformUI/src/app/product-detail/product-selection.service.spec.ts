import { TestBed, inject } from '@angular/core/testing';

import { ProductSelectionService } from './product-selection.service';

describe('ProductSelectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductSelectionService]
    });
  });

  it('should ...', inject([ProductSelectionService], (service: ProductSelectionService) => {
    expect(service).toBeTruthy();
  }));
});
