import { TestBed, inject } from '@angular/core/testing';

import { FormValidationService } from './form-validation.service';
import { FormBuilder } from '@angular/forms';
import { ClientService } from '../../shared/clients/client.service';
import { HttpModule } from '@angular/http';

describe('FormValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [FormValidationService, FormBuilder, ClientService]
    });
  });

  it('should service works well', inject([FormValidationService], (service: FormValidationService) => {
    expect(service).toBeTruthy();
  }));
});
