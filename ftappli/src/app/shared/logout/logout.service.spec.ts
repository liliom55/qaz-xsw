import { TestBed, inject } from '@angular/core/testing';

import { LogoutService } from './logout.service';
import { EmailService } from '../email/email.service';
import { HttpModule } from '@angular/http';

describe('LogoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [LogoutService,EmailService]
    });
  });

  it('should service works well', inject([LogoutService], (service: LogoutService) => {
    expect(service).toBeTruthy();
  }));
});
