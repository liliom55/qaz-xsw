import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { } from 'jasmine';
import { FitMediatorComponent } from './FitMediator.component';

describe('FitDialogComponent', () => {

  let comp: FitMediatorComponent;
  let fixture: ComponentFixture<FitMediatorComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FitMediatorComponent], // declare the test component
    });

    fixture = TestBed.createComponent(FitMediatorComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('Should be false', () => {
    expect(false).toBe(true);
  });
});
