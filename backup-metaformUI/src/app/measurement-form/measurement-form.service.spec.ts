import { TestBed, inject } from '@angular/core/testing';

import { MeasurementFormService } from './measurement-form.service';

describe('MeasurementServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasurementFormService]
    });
  });

  it('should ...', inject([MeasurementFormService], (service: MeasurementFormService) => {
    expect(service).toBeTruthy();
  }));
});
