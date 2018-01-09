import { ComponentFixture, TestBed, async, fakeAsync, tick,inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';


import { EmailFormComponent } from './email-form.component';
import { ClientService } from '../../shared/clients/client.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';
import { FormValidationService } from '../../shared/form-validation/form-validation.service';
import { FormBuilder } from '@angular/forms';
import { Client, ClientMetadata } from '../../shared/clients/client.model';
import 'rxjs/add/observable/empty';

import { TranslateModule, 
  TranslateStaticLoader, 
  TranslatePipe, 
  TranslateLoader, 
  TranslateService
} from 'ng2-translate';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
describe('EmailFormComponent', () => {
  let component: EmailFormComponent;
  let fixture: ComponentFixture<EmailFormComponent>;
  // let de: DebugElement;
  // let el: HTMLElement;
  let formService: FormValidationService;
  // let homeRoutingService: HomeRoutingService;
  let clientService: ClientService;
  let spy: any;
  let translate:TranslateService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailFormComponent],
      providers: [FormValidationService,
        ClientService,
        HomeRoutingService,
        FormValidationService,
        FormBuilder,
        TranslateService
        // { provide: ClientService, useValue: ClientServiceStub },
        // { provide: HomeRoutingService, useValue: HomeRoutingServiceStub },
        // { provide: FormValidationService, useValue: FormValidationServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
        })
      ]
    }).compileComponents();
  }));
  beforeEach(inject([TranslateService], (service) => {
    translate = service;
    translate.use('en');
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFormComponent);
    component = fixture.componentInstance;
    component.client = new Client();
    formService = fixture.debugElement.injector.get(FormValidationService);
    clientService = fixture.debugElement.injector.get(ClientService);
    // spy = spyOn(clientService, "checkExist").and.callFake(t=>{
    //   return Promise.resolve();
    // });
    fixture.detectChanges();
  });
  it('should component works well', () => {
    expect(component).toBeTruthy();
  });
  it('next method should works correctly', () => {
    const anonymous = true;
    component.next(anonymous);
    expect(component.isClickedIncognito).toBe(true);
  });
  it('Should creates a form with 1 control (form)', () => {
    expect(component.fv.emailForm.contains('email')).toBeTruthy();
  });
  it('should be required email control (form)', () => {
    const control = component.fv.emailForm.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
  it('should be match with email pattern email control (form)', () => {
    const control = component.fv.emailForm.get('email');
    control.setValue('home@gmail');
    expect(control.valid).toBeFalsy();
  });
  // it('Should be saved the client if they enter as incognito (next method)', (done) => {
  //   const anonymous = true;
  //   component.next(anonymous);
  //   setTimeout(() => {
  //     expect(component.client.id).not.toBeUndefined();
  //     done();
  //   }, 2000);
  // });

  // it('Should check exist client if they enter email (next method)', (done) => {
  //   const anonymous = false;
  //   spy = spyOn(clientService, 'checkExist').and.callFake(t => {
  //     return Promise.resolve();
  //   });
  //   component.client.email = 'leila_onsori@yahoo.com';
  //   component.next(anonymous);

  //   // expect(component.isClickedIncognito).toBeFalsy();
  //   setTimeout(() => {
  //     expect(spy).toHaveBeenCalled();
  //     done();
  //   }, 1000);
  // });

  // it('Should save the client if client does not exist (next method)', (done) => {
  //   const anonymous = false;
  //   spy = spyOn(clientService, 'addClient').and.callFake(t => {
  //     return Promise.resolve();
  //   });
  //   component.client.email = 'pani102@yahoo.com'; // needs to change for every couple of test
  //   component.next(anonymous);
  //   setTimeout(() => {
  //     expect(clientService.addClient).toHaveBeenCalled();
  //     done();
  //   }, 1500);
  // });
  //-------------------------------------------------------------------
  it('Should be saved the client if they enter as incognito (next method)', async() => {
    const anonymous = true;
    component.next(anonymous).then(()=>{
      expect(component.client.id).not.toBeUndefined();
    });
  });

  it('Should check exist client if they enter email (next method)', async() => {
    const anonymous = false;
    spy = spyOn(clientService, 'checkExist').and.returnValue(Promise.resolve());
    component.client.email = 'leila_onsori@yahoo.com';
    component.next(anonymous).then(()=>{
      expect(spy).toHaveBeenCalled();
      
    });
  });

  it('Should save the client if client does not exist (next method)', async() => {
    const anonymous = false;
    spy = spyOn(clientService, 'addClient').and.returnValue(Promise.resolve());
    component.client.email = 'pani102@yahoo.com'; // needs to change for every couple of test
    component.next(anonymous).then(()=>{
      expect(clientService.addClient).toHaveBeenCalled();
    });
  });
});
