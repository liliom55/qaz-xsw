import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [NavComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should have a link to dotos page', () => {
    const deElm = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    // <a href = "/todos">
    const index = deElm.findIndex(de => de.properties['href'] === '/todos');
    console.log(index);
    expect(index).toBeGreaterThan(-1);
  });
});
