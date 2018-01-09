import { ComponentFixture, TestBed, async, fakeAsync, tick ,inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';


import { PasswordRegistrationComponent } from './password-registration.component';
import { Client } from '../../shared/clients/client.model';
import { ClientService } from '../../shared/clients/client.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';
import { FormValidationService } from '../../shared/form-validation/form-validation.service';
import { FormBuilder } from '@angular/forms';


import { TranslateModule, 
    TranslateStaticLoader, 
    TranslatePipe, 
    TranslateLoader, 
    TranslateService
  } from 'ng2-translate';
  import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}
describe('PasswordRegistrationComponent', () => {
    let component: PasswordRegistrationComponent;
    let fixture: ComponentFixture<PasswordRegistrationComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let formService: FormValidationService;
    let clientService: ClientService;
    let ClientEl: Client;
    let translate:TranslateService;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordRegistrationComponent],
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
        fixture = TestBed.createComponent(PasswordRegistrationComponent);
        component = fixture.componentInstance;
        component.client = new Client();
        formService = fixture.debugElement.injector.get(FormValidationService);
        clientService = fixture.debugElement.injector.get(ClientService);
        fixture.detectChanges();
    });
    it('should component works well', () => {
        expect(component).toBeTruthy();
    });

    it('Should creates a form with password control (form)', () => {
        let passwrd = component.fv.passwordRegisterForm.contains('password');
        expect(passwrd).toBeTruthy();
    });
    it('should be required password control (form)', () => {
        const control = component.fv.passwordRegisterForm.get('password');
        control.setValue('');
        expect(control.valid).toBeFalsy();
    });
    it('should be at least 8 character password control (form)', () => {
        const control = component.fv.passwordRegisterForm.get('password');
        control.setValue('rge45vf'); // less than 8 character
        expect(control.valid).toBeFalsy();
    });
    it('should be maximume 20 character password control (form)', () => {
        const control = component.fv.passwordRegisterForm.get('password');
        control.setValue('qasdfghyjunmiuyt56rew'); // less than 8 character
        expect(control.valid).toBeFalsy();
    });

    it('should edit the client when registerPassword method is called', fakeAsync(() => {
        let spy = spyOn(clientService, 'editClient').and.returnValue(Promise.resolve(['824b4a0d-0b31-411c-ac9d-7e123510fe50', { password: 'wsxcderfv' }]));
        component.registerPassword('wsxcderfv');
        tick();
        expect(spy).toHaveBeenCalled();
    }));
    it('should navigate to the next step after editing the client', fakeAsync(() => {
        let spy = spyOn(clientService, 'editClient').and.returnValue(Promise.resolve(['824b4a0d-0b31-411c-ac9d-7e123510fe50', { password: 'wsxcderfv' }]));
        component.isClickedNext = false;
        component.registerPassword('wsxcderfv');
        tick();
        expect(component.isClickedNext).toBeTruthy();
    }));
    it('should be disabled the next button when the form is not valid', () => {
        let buttonElement = fixture.debugElement.queryAll(By.css('button'));
        expect(buttonElement[0].properties['disabled']).toBeTruthy();
    });

});
