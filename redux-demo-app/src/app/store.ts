import { INCREMENT } from './actions';
// https://www.udemy.com/angular2-advanced/learn/v4/t/lecture/6418350?start=0
import { Map } from 'immutable';
// https://www.udemy.com/angular2-advanced/learn/v4/t/lecture/6418348?start=0
import { tassign } from 'tassign'; // instead of Object.assign()

export interface IAppState {
  counter: number;
  messaging?: { // optional
    newMessages: number
  };
}
export const INITIAL_STATE: IAppState = {
  counter: 0,
  messaging: {
    newMessages: 5
  }
};
//// not immutable
export function rootReducer(state: IAppState, action): IAppState {
  // returns newState;
  switch (action.type) {
    case INCREMENT:
      // return { counter: state.counter + 1 };
      // return Object.assign({},state,{ counter: state.counter + 1 });
      return tassign(state, { counter: state.counter + 1 });
  }
  return state;
}
//// immutable
// export function rootReducer(state: Map<string, any>, action): Map<string, any> {
//   // returns newState;
//   switch (action.type) {
//     case INCREMENT:
//       return state.set('counter', state.get('counter') + 1);
//   }
//   return state;
// }
