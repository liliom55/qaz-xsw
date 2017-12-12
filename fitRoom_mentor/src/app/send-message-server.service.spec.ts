import { TestBed, inject } from '@angular/core/testing';

import { SendMessageServerService } from './send-message-server.service';

describe('SendMessageServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendMessageServerService]
    });
  });

  it('should ...', inject([SendMessageServerService], (service: SendMessageServerService) => {
    expect(service).toBeTruthy();
  }));
});
