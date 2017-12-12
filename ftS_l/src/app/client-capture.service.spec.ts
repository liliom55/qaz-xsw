/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientCaptureService } from './client-capture.service';

describe('Service: ClientCapture', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientCaptureService]
    });
  });

  it('should ...', inject([ClientCaptureService], (service: ClientCaptureService) => {
    expect(service).toBeTruthy();
  }));
});
