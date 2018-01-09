/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed ,inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingService } from './home-routing/home-routing.service';
import { ClientService } from '../shared/clients/client.service';

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
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let translate:TranslateService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      })],
      providers: [HomeRoutingService, ClientService,TranslateService]
    }).compileComponents();

  }));
  beforeEach(inject([TranslateService], (service) => {
    translate = service;
    translate.use('en');
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should component works well', () => {
    expect(component).toBeTruthy();
  });
  it('First current rout should be email component', () => {
    component.ngOnInit();
    expect(component.homeRouting.current).toBe('EmailFormComponent');
  });
});
