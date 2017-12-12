import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebglCanvasComponent } from './webgl-canvas.component';

describe('WebglCanvasComponent', () => {
  let component: WebglCanvasComponent;
  let fixture: ComponentFixture<WebglCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebglCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebglCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
