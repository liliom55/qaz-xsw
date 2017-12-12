import { ComponentFixture, TestBed, async,inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';


import { BodyTypeComponent } from './body-type.component';
import { ClientService } from '../../shared/clients/client.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';
import { Client, ClientCaptureMetric, ClientCapture } from '../../shared/clients/client.model';
import { environment } from '../../../environments/environment';

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
describe('BodyTypeComponent', () => {
    let component: BodyTypeComponent;
    let fixture: ComponentFixture<BodyTypeComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    let clientService: ClientService;
    let homeRoutingService:HomeRoutingService;
    let ClientEl: Client;
    let translate:TranslateService;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BodyTypeComponent],
            providers: [
                ClientService,
                HomeRoutingService,
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
        fixture = TestBed.createComponent(BodyTypeComponent);
        component = fixture.componentInstance;
        component.client = new Client();
        component.clientCapture = new ClientCapture();
        clientService = fixture.debugElement.injector.get(ClientService);
        homeRoutingService = fixture.debugElement.injector.get(HomeRoutingService);
        fixture.detectChanges();
    });
    it('should component works well', () => {
        expect(component).toBeTruthy();
    });
    it('should gender be according config gender info', () => {
        expect(component.gender).toBe(environment.gender);
    });
    it('should be null clientCapture.clientCaptureMetrics at the first', () => {
        component.clientCapture.clientCaptureMetrics = [new ClientCaptureMetric('belly_type', 1)];
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.clientCapture.clientCaptureMetrics).toBeNull();
    });
    it('should assign new bodyTypeItem to selectedType', () => {
        // spyOn(component, 'selectType');
        let bodyTypeItem = { id: 2, title: "Voluminous & massive" };
        component.selectedType = { id: null, title: null };
        let item = fixture.debugElement.query(By.css('.content-li'));
        component.selectType(bodyTypeItem);
        expect(component.selectedType).toBe(bodyTypeItem);
    });
    it('should NOT be empty clientBodyTypes array after click the button and calling gatherBodyType function', () => {
        component.gatherBodyType('belly_type',1);
        fixture.detectChanges();
        expect(component.clientBodyTypes.length).not.toBe(0);
    });
    it('should submit body type if the last item of body type is selected', () => {
        spyOn(component, 'submitBodyType');
        component.currentIndex = 0; // for Simons app
        component.gatherBodyType('belly_type',1);
        fixture.detectChanges();
        expect(component.submitBodyType).toHaveBeenCalled();
    });
    it('should add clientCapture to server after calling submitBodyType if the appType is fitroom ', () => {
        spyOn(clientService, 'addClientCapture').and.callFake(t => {
            return Promise.resolve();
          });
        component.appType = 'fitroom';
        component.submitBodyType([new ClientCaptureMetric('belly_type', 1)]);
        fixture.detectChanges();
        expect(clientService.addClientCapture).toHaveBeenCalled();
    });
    it('should goes to next step if the client press button', () => {
        spyOn(homeRoutingService, 'next');
        component.next();
        fixture.detectChanges();
        expect(homeRoutingService.next).toHaveBeenCalled();
    });
});
