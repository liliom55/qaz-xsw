/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductsCaptureService } from './products-capture.service';

describe('Service: ProductsCapture', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsCaptureService]
    });
  });

  it('should ...', inject([ProductsCaptureService], (service: ProductsCaptureService) => {
    expect(service).toBeTruthy();
  }));
});
