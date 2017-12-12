import { TestBed, inject } from '@angular/core/testing';
import { WebglService } from './webgl.service';

describe('WebglService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebglService]
    });
  });

  it('should ...', inject([WebglService], (service: WebglService) => {
    expect(service).toBeTruthy();
  }));
});
