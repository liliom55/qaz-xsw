/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {HttpModule} from '@angular/http';
import {Observable} from 'rxjs';
import "rxjs/add/observable/from";
import "rxjs/add/observable/empty";
import "rxjs/add/observable/throw";

import { TodosComponent } from './todos.component';
import {TodoService} from './todo.service';

//NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not 
// provided the TodoService as a dependency to TodosComponent. 
// 
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below. 

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  //let service:TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpModule],
      declarations: [ TodosComponent ],
      providers:[TodoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    //we comment this line and move it to line 43 because 
    //this line will call ngOnInit so the method under tested (getTodos)  is 
    //already called so we will get failure test
    //fixture.detectChanges(); 
    });

  it('should load todos from the server', () => {
    //let service = TestBed.get(TodoService);  ====  fixture.DebugElement.injector.get(TodoService);
    let service = TestBed.get(TodoService);
    spyOn(service,'getTodos').and.returnValue(Observable.from([[1,2,3]])); //for Observable
    //spyOn(service,'getTodosPromise').and.returnValue(Promise.resolve([[1,2,3]]));
    fixture.detectChanges();
    expect(component.todos.length).toBe(3);
    console.log("EXPECT WAS CALLED");
  });

  it('should call the server to save the changes when a new todo item is added',()=>{
    fixture.detectChanges(); 
    let service = TestBed.get(TodoService);
    let spy = spyOn(service,'add').and.callFake(t => { 
      return Observable.empty(); 
    });
    component.add();
    expect(spy).toHaveBeenCalled();
    console.log('add from service should be called');
  });
  it('should add the new todo returned from the server',()=>{
    fixture.detectChanges(); 
    let service = TestBed.get(TodoService);
    let todo = {id:1};
    // let spy = spyOn(service,'add').and.callFake(t => { 
    //   return Observable.from([todo]); 
    // });              //or:
    let spy = spyOn(service,'add').and.returnValue(Observable.from([todo]));
    component.add();
    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });
  it('should set the message property if server returns an error when adding a new todo',()=>{
    fixture.detectChanges(); 
    let service = TestBed.get(TodoService);
    let error  = 'error from the server';
    let spy = spyOn(service,'add').and.returnValue(Observable.throw(error));
    component.add();
    expect(component.message).toBe(error);
  });

  it('should call the server to delete a todo item if the user confirms',()=>{
    fixture.detectChanges(); 
    let service = TestBed.get(TodoService);
    spyOn(window,'confirm').and.returnValue(true);
    let spy = spyOn(service,'delete').and.returnValue(Observable.empty());  //when we do not care what we get from the server we use empty method
    component.delete(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT call the server to delete a todo item if the user cancels',()=>{
    fixture.detectChanges(); 
    let service = TestBed.get(TodoService);
    spyOn(window,'confirm').and.returnValue(false);
    let spy = spyOn(service,'delete').and.returnValue(Observable.empty());  //when we do not care what we get from the server we use empty method
    component.delete(1);
    expect(spy).not.toHaveBeenCalled();
  });
});
