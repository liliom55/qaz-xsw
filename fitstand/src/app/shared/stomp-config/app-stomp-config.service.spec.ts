import { TestBed, inject } from '@angular/core/testing';

import { AppStompConfigService } from './app-stomp-config.service';

describe('AppStompConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStompConfigService]
    });
  });

  it('should ...', inject([AppStompConfigService], (service: AppStompConfigService) => {
    expect(service).toBeTruthy();
  }));
});
