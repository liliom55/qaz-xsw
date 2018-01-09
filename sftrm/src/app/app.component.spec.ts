/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterTestingModule} from '@angular/router/testing';
import { TranslateModule } from "ng2-translate";

describe('AppComponent', () => {

  beforeEach(() => {
      TestBed.configureTestingModule({
          declarations: [AppComponent],
          imports: [RouterTestingModule, TranslateModule.forRoot()]  

    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  //it(`should have as title 'app works!'`, async(() => {
  //  let fixture = TestBed.createComponent(AppComponent);
  //  let app = fixture.debugElement.componentInstance;
  //  expect(app.title).toEqual('app works!');
  //}));

  //it('should render title in a h1 tag', async(() => {
  //  let fixture = TestBed.createComponent(AppComponent);
  //  fixture.detectChanges();
  //  let compiled = fixture.debugElement.nativeElement;
  //  expect(compiled.querySelector('h1').textContent).toContain('app works!');
  //}));
});
