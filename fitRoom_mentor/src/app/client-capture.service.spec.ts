/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientCaptureService } from './client-capture.service';
import { Http, Response } from '@angular/http';

describe('Service: ClientCapture', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [ClientCaptureService, Http]
    });
  });

  it('should ...', inject([ClientCaptureService], (service: ClientCaptureService) => {
    expect(service).toBeTruthy();
  }));
});
