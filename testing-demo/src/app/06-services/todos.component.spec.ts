import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;
  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    let todos = [
      { id: 1, title: 'a' },
      { id: 2, title: 'b' },
      { id: 3, title: 'c' }
    ];
    // we can check a method of service has been called / change the
    // implementation of that method /return a defferent value
    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from([todos])
    });
    component.ngOnInit();
    expect(component.todos).toBe(todos);
  });
  it('should call the server to save the changes when a new todo item is added', () => {
    let spy = spyOn(service, 'add').and.callFake(todo => {
      // we use empty method because in this case we
      // don't care about return value of add() method
      return Observable.empty();
    });
    component.add();
    expect(spy).toHaveBeenCalled();
  });
  it('should add the new todo returned from the server', () => {
    let todo = { id: 4, title: 'd' };
    let spy = spyOn(service, 'add').and.returnValue(Observable.from([todo]));
    // // Same as the line above
    // let spy = spyOn(service,'add').and.callFake(todo=>{
    //   // we use empty method because in this case we
    //   // don't care about return value of add() method
    //   return Observable.from([todo]);
    // });
    component.add();
    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });
  it('should set the message property if server returns an error when adding a new todo', () => {
    let error = 'error from the server'
    let spy = spyOn(service, 'add').and.returnValue(Observable.throw(error));
    component.add();
    expect(component.message).toBe(error);
  });
  it('should call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'add').and.returnValue(Observable.empty());
    component.delete(1);
    expect(spy).toHaveBeenCalledWith(1);
  });
  it('should NOT call the server to delete a todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'add').and.returnValue(Observable.empty());
    component.delete(1);
    expect(spy).not.toHaveBeenCalled();
  });
});
