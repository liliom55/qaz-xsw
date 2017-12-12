import { Params } from '@angular/router';
import { delay } from 'rxjs/operator/delay';
import { any } from 'codelyzer/util/function';
import { setTimeout } from 'timers';
import { Observable, Subject } from 'rxjs/Rx';
import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute, RouterLinkWithHref } from '@angular/Router';
import { UserDetailsComponent } from './user-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SpyLocation } from '@angular/common/testing';


class RouterStub {
  navigate(Params) { };
}
class ActivatedRouteStub {
  private subject = new Subject();
  push(value) {
    // with next method we can push a value to an observable
    this.subject.next(value);
  }
  get params() {
    return this.subject.asObservable();
  }
  // params: Observable<any> = Observable.empty();
}
describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let router: Router;
  let route: ActivatedRouteStub;
  let spy: jasmine.Spy;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [UserDetailsComponent],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ],
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;
        // fixture.detectChanges();
      });
  }));



  // it('should redirect the user to the users page after saving', (done) => {
  //   router = TestBed.get(Router);
  //   spy = spyOn(router, 'navigate');
  //   component.save();
  //   setTimeout(() => {
  //     expect(spy).toHaveBeenCalledWith(['users']);
  //   }, 0);
  //   done();
  // });
  // it('should navigate the user to the not found page when an invalid user id is passed', (done) => {
  //   route = TestBed.get(Router);
  //   spy = spyOn(router, 'navigate');
  //   route = TestBed.get(ActivatedRoute);
  //   route.push({ id: 0 });
  //   setTimeout(() => {
  //     expect(spy).toHaveBeenCalledWith(['not-found']);
  //   }, 0);
  //   done();
  // });

});
