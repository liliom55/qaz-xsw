import { ComponentFixture, TestBed, async,inject } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { GoodbyeComponent } from './goodbye/goodbye.component';
import { environment } from '././../environments/environment';
import { HomeRoutingService } from './home/home-routing/home-routing.service';

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
describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let userService: Title;
  let translate:TranslateService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        CatalogComponent,
        GoodbyeComponent
      ],
      providers: [
        { provide: Title, useClass: Title },
        HomeRoutingService,
        TranslateService
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
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    // translate = fixture.debugElement.injector.get(TranslateService);
    // translate.use('en');
    fixture.detectChanges();
  });
  it('should component works well', () => {
    expect(comp).toBeTruthy();
});
  it('page title should be CORRECT', async(() => {
    userService = TestBed.get(Title);
    const t = (environment.app + '-' + environment.retailer).toUpperCase();
    comp.ngOnInit();
    expect(userService.getTitle()).toBe(t);
  }));

});
