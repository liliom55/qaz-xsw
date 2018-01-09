import { async, ComponentFixture, TestBed, inject,fakeAsync,tick } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GoodbyeComponent } from './goodbye.component';
import { CustomRoutingService } from '../shared/custom-routing/custom-routing.service';
import { LogoutService } from '../shared/logout/logout.service';
import { FormValidationService } from "../shared/form-validation/form-validation.service";
import { ClientService } from '../shared/clients/client.service';
import { Client, ClientCapture } from '../shared/clients/client.model';
import { Product } from '../shared/products/product.model';
import { FormBuilder } from '@angular/forms';

import {
  TranslateModule,
  TranslateStaticLoader,
  TranslatePipe,
  TranslateLoader,
  TranslateService
} from 'ng2-translate';
import { Http } from '@angular/http';
import { EmailService } from "app/shared/email/email.service";

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, 'assets/i18n/', '.json');
}
describe('GoodbyeComponent', () => {
  let component: GoodbyeComponent;
  let fixture: ComponentFixture<GoodbyeComponent>;
  let translate: TranslateService;
  let customRoutingService: CustomRoutingService;
  let clientService: ClientService;
  let logoutService :LogoutService; 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoodbyeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        CustomRoutingService,
        LogoutService,
        FormValidationService,
        ClientService,
        EmailService,
        FormBuilder,
        TranslateService
      ],
      imports: [
        BrowserAnimationsModule,
        TranslateModule.forRoot({
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [Http]
        })
      ]
    })
      .compileComponents();
  }));
  beforeEach(inject([TranslateService], (service) => {
    translate = service;
    translate.use('en');
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(GoodbyeComponent);
    component = fixture.componentInstance;
    customRoutingService = fixture.debugElement.injector.get(CustomRoutingService);
    clientService = fixture.debugElement.injector.get(ClientService);
    logoutService= fixture.debugElement.injector.get(LogoutService);
    component.client = new Client();
    component.clientCapture = new ClientCapture();
    component.selectedProducts = null;
    fixture.detectChanges();
  });

  it('should works well', () => {
    expect(component).toBeTruthy();
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
  it('should be the same client.email and email variable (ngOnInit method)', () => {
    component.client.email = 'liliom@yahoo.com';
    component.ngOnInit();
    expect(component.email).toEqual(component.client.email);
  });
  it('should be called switchRoute of customRoutingService (back method)', () => {
    spyOn(customRoutingService, 'switchRoute')
    component.back();
    expect(customRoutingService.switchRoute).toHaveBeenCalled();
  });
  it('should be true isSended variable on (sendEmail method)', () => {
    component.isSended = false;
    component.client.id = '824b4a0d-0b31-411c-ac9d-7e123510fe50';
    component.sendEmail('liliom@yahoo.com');
    expect(component.isSended).toBeTruthy();
  });
  it('should be the same client.email and emails parameter which is passed on (sendEmail method)', () => {
    component.client.email = '';
    component.client.id = '824b4a0d-0b31-411c-ac9d-7e123510fe50';
    component.sendEmail('liliom@yahoo.com');
    expect(component.client.email).toBe('liliom@yahoo.com');
  });
  it('should check out the client exist or not on (sendEmail method)', () => {
    spyOn(clientService, 'checkExist').and.callFake(t => {return Promise.resolve();});
    component.client.id = '824b4a0d-0b31-411c-ac9d-7e123510fe50';
    component.sendEmail('liliom@yahoo.com');
    expect(clientService.checkExist).toHaveBeenCalled();
  });
  // it('should be called editClient and addClientCapture if the client is exist on (sendEmail method)', async(done) => {
  //   spyOn(clientService, 'editClient').and.callFake(t => {return Promise.resolve();});;
  //   spyOn(clientService, 'addClientCapture').and.callFake(t => { return Promise.resolve();});
  //   component.client.id = '824b4a0d-0b31-411c-ac9d-7e123510fe50';
  //   component.sendEmail('leila_onsori@yahoo.com'); //exist client
  //   setTimeout(() => {
  //     expect(clientService.editClient).toHaveBeenCalled();
  //     setTimeout(() => {
  //       expect(clientService.addClientCapture).toHaveBeenCalled(); 
  //     }, 0);
  //      done();
  //   }, 1000);
  // });
  // it('should NOT be called addClientCapture if the client is new on (sendEmail method)', async(done) => {
  //   spyOn(clientService, 'editClient').and.callFake(t => {
  //     return Promise.resolve();
  //   });
  //   spyOn(clientService, 'addClientCapture').and.callFake(t => {
  //     return Promise.resolve();
  //   });
  //   component.client.id = '1';
  //   component.sendEmail('blabblab@yahoo.com'); //new client
  //   setTimeout(() => {
  //     expect(clientService.editClient).toHaveBeenCalled();
  //     expect(clientService.addClientCapture).not.toHaveBeenCalled(); 
  //     done();
  //   }, 1000);
  // });
  //-----------------------------------
  it('should be called editClient and addClientCapture if the client is exist on (sendEmail method)', async() => {
    component.client.id = '824b4a0d-0b31-411c-ac9d-7e123510fe50';
    let spy1 = spyOn(clientService, 'editClient').and.returnValue(Promise.resolve([component.client.id,null]));
    let spy2 = spyOn(clientService, 'addClientCapture').and.returnValue(Promise.resolve([null]));
    //exist client
    component.sendEmail('leila_onsori@yahoo.com') 
    .then(()=>{
      expect(spy1).toHaveBeenCalled();
      expect(spy2).toHaveBeenCalled(); 
    });
  });
  it('should NOT be called addClientCapture if the client is new on (sendEmail method)', async() => {
    component.client.id = '824b4a0d-0b31-411c-ac9d-7e123510fe50';
    let spy1 = spyOn(clientService, 'editClient').and.returnValue(Promise.resolve([component.client.id,null]));
    let spy2 = spyOn(clientService, 'addClientCapture').and.returnValue(Promise.resolve([null]));
    //new client
    component.sendEmail('blabblab@yahoo.com') 
    .then(()=>{
      expect(spy1).toHaveBeenCalled();
      expect(spy2).not.toHaveBeenCalled(); 
    });
  });
  //------------------------------------
  it('should be called logout of logoutService (logout method)', () => {
    spyOn(logoutService, 'logout')
    component.logout();
    expect(logoutService.logout).toHaveBeenCalled();
  });
});
