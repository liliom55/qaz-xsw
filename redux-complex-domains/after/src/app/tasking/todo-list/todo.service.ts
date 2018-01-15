import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from 'ng2-redux';
@Injectable()
export class TodoService {
  private readonly url = 'https://jsonplaceholder.typicode.com/todos';

  constructor(
    private http: Http,
    private ngRedux:NgRedux
  ) {}

  loadTodos() {
    // for implementing loading icon during feching
    this.ngRedux.dispatch({type:'FECH_TODOS_REQUEST'});
    //store.isFeching = true;
    this.http.get(this.url).subscribe(todos=>{
      this.ngRedux.dispatch({type:'FECH_TODOS_SUCCESS',todos:todos.json()})
    },err=>{
      this.ngRedux.dispatch({type:'FECH_TODOS_ERROR'})
    })
  }

  addTodo(todo) {
    this.http.post(this.url, todo).subscribe(t=>{
      this.ngRedux.dispatch({type:'ADD_TODO',todo:t})
    });
  }
}
