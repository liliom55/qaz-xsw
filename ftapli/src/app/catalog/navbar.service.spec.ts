import { TestBed, inject } from '@angular/core/testing';

import { NavbarService } from './navbar.service';

describe('NavbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavbarService]
    });
  });

  it('should service works well', inject([NavbarService], (service: NavbarService) => {
    expect(service).toBeTruthy();
  }));
});
