import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGlobalComponent } from './menu-global.component';
import {NO_ERRORS_SCHEMA } from '@angular/core';
import { CustomMaterialModule } from '../../customMaterialModule';

describe('MenuGlobalComponent', () => {
  let component: MenuGlobalComponent;
  let fixture: ComponentFixture<MenuGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuGlobalComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports:[CustomMaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should works well', () => {
    expect(component).toBeTruthy();
  });
});
