import { ADDITEM, DELETEITEM, UPDATEITEM, DELETEALLITEM } from './actions';
import { tassign } from 'tassign'; // instead of Object.assign()

export interface IAppState {
  items: any[];
  lastUpdate: Date;
}
export const INITIAL_STATE: IAppState = {
  items: [],
  lastUpdate: null
};

// or:
class TodoAction {
  constructor(private state, private action) {
  }
  addItem() {
    const item = this.action.param;
    const itemList = this.state.items.concat(item);
    return tassign(this.state, { items: itemList, lastUpdate: new Date() });
  }
  deleteItem() {
    const id = this.action.param;
    const itemsFilter = this.state.items.filter((obj) => obj.id !== id);
    return tassign(this.state, { items: itemsFilter, lastUpdate: new Date() });
  }
  updateItem() {
    const itemId = this.action.param.id;
    const updatedItem = this.action.param;
    const selItem = this.state.items.find(obj => obj.id === itemId);
    const index = this.state.items.indexOf(selItem);
    const beforeItem = this.state.items.slice(0, index);
    const afterItem = this.state.items.slice(index + 1);
    return tassign(this.state, { items: [...beforeItem, updatedItem, ...afterItem], lastUpdate: new Date() });
  }
  deleteAll() {
    return tassign(this.state, { items: [], lastUpdate: new Date() });
  }
}
export function rootReducer(state: IAppState, action): IAppState {
  const actions = new TodoAction(state, action);
  // returns newState;
  switch (action.type) {
    case ADDITEM: return actions.addItem();
    case DELETEITEM: return actions.deleteItem();
    case UPDATEITEM: return actions.updateItem();
    case DELETEALLITEM: return actions.deleteAll();
  }
  return state;
}
// same as: ----------------------------------------------------------
// function addItem(state, action) {
//   const item = action.param;
//   const itemList = state.items.concat(item);
//   return tassign(state, { items: itemList, lastUpdate: new Date() });
// }
// function deleteItem(state, action) {
//   const id = action.param;
//   const itemsFilter = state.items.filter((obj) => obj.id !== id);
//   return tassign(state, { items: itemsFilter, lastUpdate: new Date() });
// }
// function updateItem(state, action) {
//   const itemId = action.param.id;
//   const updatedItem = action.param;
//   const selItem = state.items.find(obj => obj.id === itemId);
//   const index = state.items.indexOf(selItem);
//   const beforeItem = state.items.slice(0, index);
//   const afterItem = state.items.slice(index + 1);
//   return tassign(state, { items: [...beforeItem, updatedItem, ...afterItem], lastUpdate: new Date() });
// }
// function deleteAll(state, action) {
//   return tassign(state, { items: [], lastUpdate: new Date() });
// }
// export function rootReducer(state: IAppState, action): IAppState {
//   // returns newState;
//   switch (action.type) {
//     case ADDITEM: return addItem(state, action);
//     case DELETEITEM: return deleteItem(state, action);
//     case UPDATEITEM: return updateItem(state, action);
//     case DELETEALLITEM: return deleteAll(state, action);
//   }
//   return state;
// }
