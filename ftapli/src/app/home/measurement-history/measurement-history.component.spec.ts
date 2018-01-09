import { ComponentFixture, TestBed, async ,inject,fakeAsync} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { MeasurementHistoryComponent } from './measurement-history.component';
import { Client, ClientCapture, ClientCaptureMetric } from '../../shared/clients/client.model';
import { ClientService } from '../../shared/clients/client.service';
import { Product } from '../../shared/products/product.model';
import { ProductService } from '../../shared/products/product.service';
import { HomeRoutingService } from '../home-routing/home-routing.service';


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
describe('MeasurementHistoryComponent', () => {
    let component: MeasurementHistoryComponent;
    let fixture: ComponentFixture<MeasurementHistoryComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let ClientEl: Client;
    let translate:TranslateService;
    let homeRouteService:HomeRoutingService;
    let clientService:ClientService;
    let productService:ProductService;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MeasurementHistoryComponent],
            providers: [
                ProductService,
                HomeRoutingService,
                ClientService,
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
        fixture = TestBed.createComponent(MeasurementHistoryComponent);
        component = fixture.componentInstance;
        homeRouteService = fixture.debugElement.injector.get(HomeRoutingService);
        clientService = fixture.debugElement.injector.get(ClientService);
        productService = fixture.debugElement.injector.get(ProductService);

        component.client = new Client();
        component.products = [];

        fixture.detectChanges();

    });
    it('should component works well', () => {
        expect(component).toBeTruthy();
    });
    it('should be called next of homeRoutingService (routeDecision method)', () => {
        spyOn(homeRouteService,'next');
        component.routeDecision('new');
        expect(homeRouteService.next).toHaveBeenCalled();
    });
    it('should be true isClickedNew if choice parameter is new (routeDecision method)', () => {
        component.isClickedNew = false;
        component.routeDecision('new');
        expect(component.isClickedNew).toBeTruthy();
    });
    it('should be false isClickedOld if choice parameter is new (routeDecision method)', () => {
        component.isClickedOld = false;
        component.routeDecision('new');
        expect(component.isClickedOld).toBeFalsy();
    });
    it('should be false isClickedNew if choice parameter is old (routeDecision method)', () => {
        component.isClickedNew = false;
        component.routeDecision('old');
        expect(component.isClickedNew).toBeFalsy();
    });
    it('should be true isClickedOld if choice parameter is old (routeDecision method)', () => {
        component.isClickedOld = false;
        component.routeDecision('old');
        expect(component.isClickedOld).toBeTruthy();
    });
    it('should be true isClickedNew if there is not client.clientMetrics (addCapture method)', () => {
        component.isClickedNew = false;
        component.addCapture();
        expect(component.isClickedNew).toBeTruthy();
    });
    it('should be called getClientCapture if there is client.clientMetrics (addCapture method)', async() => {
        component.client.clientMetrics = {"volume":0,"breast_band_size":90,"under-breast_band_size":70,"spacing":0,"sagging":0,"valid":0,"right_siding_height":11.31057,"breast_type":-1,"neck_size":38,"bridge_distance":1.63781,"chest_size":10,"waist_size":10,"left_siding_height":9.45081,"right_apex_to_shoulder":26.61869,"weight":80,"belly_type":1,"right_breast_volume":727.145,"height":180,"left_breast_volume":579.053,"shoulder_distance":30.88386,"left_apex_to_shoulder":28.10713};
        let spy = spyOn(clientService,'getClientCapture').and.returnValues(Promise.resolve());
        component.addCapture().then(()=>{
            expect(spy).toHaveBeenCalled();
        });
    });
    it('should be called match of productService (match method)', async() => {
        spyOn(productService,'match').and.returnValues(Promise.resolve());
        component.match('1490297895.55035').then(()=>{
            expect(productService.match).toHaveBeenCalled();
        });
    });
    it('should NOT be empty products with valid captureId (match method)', async() => {
        spyOn(productService,'match').and.returnValues(Promise.resolve(['1490297895.55035']));
        component.match('1490297895.55035').then(()=>{
            expect(component.products.length).toBeGreaterThan(0);
        });
    });
});
