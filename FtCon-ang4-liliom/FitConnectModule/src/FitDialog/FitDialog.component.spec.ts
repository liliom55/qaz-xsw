import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { } from 'jasmine';
import { FitDialogComponent } from './FitDialog.component';

describe('FitDialogComponent', () => {

  let comp: FitDialogComponent;
  let fixture: ComponentFixture<FitDialogComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FitDialogComponent], // declare the test component
    });

    fixture = TestBed.createComponent(FitDialogComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('Should be false', () => {
    expect(false).toBe(true);
  });
});
