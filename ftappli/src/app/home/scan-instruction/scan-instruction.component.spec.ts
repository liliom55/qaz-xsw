import { async, ComponentFixture, TestBed ,inject} from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ScanInstructionComponent } from './scan-instruction.component';
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
describe('ScanInstructionComponent', () => {
  let component: ScanInstructionComponent;
  let fixture: ComponentFixture<ScanInstructionComponent>;
  let translate:TranslateService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScanInstructionComponent],
      providers: [
        HomeRoutingService,
        TranslateService
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot({
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      })]
    })
      .compileComponents();
  }));
  beforeEach(inject([TranslateService], (service) => {
    translate = service;
    translate.use('en');
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ScanInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should component works well', () => {
    expect(component).toBeTruthy();
  });
});
