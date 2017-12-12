import { ComponentFixture, TestBed, async, inject, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';


import { PasswordAuthentificationComponent } from './password-authentification.component';
import { Client } from '../../shared/clients/client.model';
import { ClientService } from '../../shared/clients/client.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';
import { FormValidationService } from '../../shared/form-validation/form-validation.service';
import { FormBuilder } from '@angular/forms';


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
describe('PasswordAuthentificationComponent', () => {
    let component: PasswordAuthentificationComponent;
    let fixture: ComponentFixture<PasswordAuthentificationComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let formService: FormValidationService;
    let clientService: ClientService;
    let ClientEl: Client;
    let translate: TranslateService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordAuthentificationComponent],
            providers: [FormValidationService,
                ClientService,
                HomeRoutingService,
                FormValidationService,
                FormBuilder, TranslateService,
                FormBuilder,
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
        fixture = TestBed.createComponent(PasswordAuthentificationComponent);
        component = fixture.componentInstance;
        component.client = new Client();
        formService = fixture.debugElement.injector.get(FormValidationService);
        // formService.buildFormEmail();
        // clientService = fixture.debugElement.injector.get(ClientService);
        fixture.detectChanges();
    });
    it('should component works well', () => {
        expect(component).toBeTruthy();
    });
    it('Should creates a form with password control (form)', () => {
        let passwrd = component.fv.passwordForm.contains('password');
        expect(passwrd).toBeTruthy();
    });
    it('should be required password control (form)', () => {
        const control = component.fv.passwordForm.get('password');
        control.setValue('');
        expect(control.valid).toBeFalsy();
    });
    it('should be match with password of client', async(() => {
        component.client.id = '824b4a0d-0b31-411c-ac9d-7e123510fe50';
        component.ngOnInit();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const control = component.fv.passwordForm.get('password');
            control.setValue('fhfdhdfh'); // exist password
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(control.valid).toBeFalsy();
            });
        });
    }));
    it('should be disabled if form is not valid', async(() => {
        de = fixture.debugElement.query(By.css('.stefanka-button-large'));
        const control = component.fv.passwordForm.get('password');
        control.setValue('fgtf');
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(de.nativeElement.disabled).toBeTruthy();
        });
    }));
});
