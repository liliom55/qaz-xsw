import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanInstructionComponent } from './scan-instruction.component';

describe('ScanInstructionComponent', () => {
  let component: ScanInstructionComponent;
  let fixture: ComponentFixture<ScanInstructionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanInstructionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
