/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CartService } from './cart.service';
import {Http} from '@angular/http';

describe('CartService: AddToCart', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[],
      providers: [CartService,{ provide: Http, useValue: {} }]
    });
  });

  it('should CartService works well', inject([CartService], (service: CartService) => {
    expect(service).toBeTruthy();
  }));
  
});
