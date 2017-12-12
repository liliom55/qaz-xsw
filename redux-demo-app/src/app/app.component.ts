import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from './store';
import { INCREMENT } from './actions';
import { Map } from 'immutable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  // // not immutable:
  @select('counter') count;

  // // immutable:
  // @select(s => s.get('counter')) count; // state.get('counter')

  // // just to show deferent way of using select decorator:
  // @select(['messaging', 'newMessages']) newMessages; // to access messaging.newMessages
  // @select((s: IAppState) => s.messaging.newMessages) newMessagesCount;
  // --------------------------------------------------
  // // not immutable:
  constructor(private ngRedux: NgRedux<IAppState>) {
    // // !: do not need them any more. instead use @select and async on template
    // ngRedux.subscribe(() => {
    //   // returns the current state
    //   // console.log(ngRedux.getState());
    //   const store_counter = ngRedux.getState();
    //   this.counter = store_counter.counter;
    // });
  }
  // ---------------------------------------------------
  // // immutable:
  // constructor(private ngRedux: NgRedux<Map<string, any>>) {
  // }
  increment() {
    // // normal way without redux :
    // this.counter++;
    // // with redux:
    this.ngRedux.dispatch({ type: INCREMENT });
  }
}
