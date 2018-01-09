import { TestBed, inject } from '@angular/core/testing';

import { PasswordFormService } from './password-form.service';

describe('PasswordFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordFormService]
    });
  });

  it('should be created', inject([PasswordFormService], (service: PasswordFormService) => {
    expect(service).toBeTruthy();
  }));
});
