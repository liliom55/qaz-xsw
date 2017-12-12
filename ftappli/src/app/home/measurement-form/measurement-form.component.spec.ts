import { ComponentFixture, TestBed, async, fakeAsync, tick, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';


import { MeasurementFormComponent } from './measurement-form.component';
import { environment } from '../../../environments/environment'
import { Client, ClientCapture, ClientCaptureMetric } from '../../shared/clients/client.model';
import { ProductService } from '../../shared/products/product.service';
import { ClientService } from '../../shared/clients/client.service';
import { MeasurementFormService } from './measurement-form.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';
import { DynamicFormComponent } from '../../shared/dynamic-form/dynamic-form.component';
import { FormControlService } from '../../shared/dynamic-form/form-control.service';


import {
  TranslateModule,
  TranslateStaticLoader,
  TranslatePipe,
  TranslateLoader,
  TranslateService
} from 'ng2-translate';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
describe('MeasurementFormComponent', () => {
  let component: MeasurementFormComponent;
  let fixture: ComponentFixture<MeasurementFormComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let ClientEl: Client;
  let mFormService: MeasurementFormService;
  let clientService: ClientService;
  let translate: TranslateService;
  let productService: ProductService;
  let homerouteService: HomeRoutingService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeasurementFormComponent],
      providers: [
        ProductService,
        MeasurementFormService,
        HomeRoutingService,
        ClientService,
        FormControlService,
        TranslateService
        // { provide: HomeRoutingService, useValue: HomeRoutingServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      })]
    }).compileComponents();
  }));
  beforeEach(inject([TranslateService], (service) => {
    translate = service;
    translate.use('en');
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementFormComponent);
    component = fixture.componentInstance;
    component.client = new Client();
    component.clientCapture = new ClientCapture();
    mFormService = fixture.debugElement.injector.get(MeasurementFormService);
    clientService = fixture.debugElement.injector.get(ClientService);
    productService = fixture.debugElement.injector.get(ProductService);
    homerouteService = fixture.debugElement.injector.get(HomeRoutingService);
    fixture.detectChanges();
  });
  xit('should component works well', () => {
    expect(component).toBeTruthy();
  });
  it('should Units be match to environments units', () => {
    component.ngOnInit();
    expect(component.systemChoice).toBe(environment.defaultMeasurementSystem);
  });
  xit('should questions contain feet as a key on simons app', () => {
    component.ngOnInit();
    if (environment.app === 'fitStand' && environment.retailer === 'simons') {
      expect(component.questions[0].key).toBe('feet');
    } else {
      expect(true).toBe(true);
    }
  });
  xit('should questions contain breast_band_size as a key on lilianne app', () => {
    component.ngOnInit();
    if (environment.app === 'fitStand' && environment.retailer === 'lilianne') {
      expect(component.questions[0].key).toBe('breast_band_size');
    } else {
      expect(true).toBe(true);
    }
  });
  xit('should NOT be flase hasHeight on simons app', () => {
    component.ngOnInit();
    if (environment.app === 'fitStand' && environment.retailer === 'simons') {
      expect(component.hasHeight).not.toBeFalsy();
    } else {
      expect(true).toBe(true);
    }
  });
  xit('should be flase hasHeight on simons app', () => {
    component.ngOnInit();
    if (environment.app === 'fitStand' && environment.retailer === 'lilianne') {
      expect(component.hasHeight).toBeFalsy();
    } else {
      expect(true).toBe(true);
    }
  });
  it('should NOT be same systemChoice before and after calling toggleSystemChoice', () => {
    const unit = component.systemChoice;
    component.toggleSystemChoice();
    expect(unit).not.toBe(component.systemChoice);
  });
  //--------------------------------------------
  it('should be called convertUnit of measurementFormService if systemChoice is imperial', async () => {
    component.systemChoice = 'imperial';
    spyOn(mFormService, 'convertUnit');
    component.updateClientCapture().then(() => {
      expect(mFormService.convertUnit).toHaveBeenCalled();
    });
  });
  it('should be called editClient of ClientService on updateClientCapture method', async () => {
    spyOn(clientService, 'editClient').and.returnValue(Promise.resolve([null]));
    component.updateClientCapture().then(() => {
      expect(clientService.editClient).toHaveBeenCalled();
    });
  });
  it('should be called addClientCapture of ClientService on updateClientCapture method', async () => {
    spyOn(clientService, 'addClientCapture').and.returnValue(Promise.resolve([null]));
    component.updateClientCapture().then(() => {
      expect(clientService.addClientCapture).toHaveBeenCalled();
    });
  });
  //-----------------------------------------------------------
  it('should NOT be undefined or empty questions (updateClientCapture method)', () => {
    component.updateClientCapture();
    expect(component.questions.length).toBeGreaterThan(0);
  });
  it('should be false isClickedNext if the form is not valid (updateClientCapture method)', () => {
    component.updateClientCapture();
    expect(component.isClickedNext).toBeFalsy();
  });
  xit('should NOT contain height measurementElem if systemChoice is imperial (cleanForm method)', () => {
    component.systemChoice = 'imperial';
    component.cleanForm();
    expect(component.measurementElem).not.toContain('height');
  });
  xit('should NOT contain feet and inch measurementElem if systemChoice is NOT imperial (cleanForm method)', () => {
    component.systemChoice = 'metric';
    component.cleanForm();
    expect(component.measurementElem).not.toContain('feet');
    expect(component.measurementElem).not.toContain('inch');
  });
  it('should be called match of productService (match method)', async() => {
    spyOn(productService, 'match').and.returnValue(Promise.resolve());
    component.match('1490297895').then(()=>{
      expect(productService.match).toHaveBeenCalled();
    });
  });
  it('should be called next of homeRoutingService (next method)', () => {
    spyOn(homerouteService, 'next');
    component.next();
    expect(homerouteService.next).toHaveBeenCalled();
  });
});
