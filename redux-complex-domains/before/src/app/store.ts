import { tassign } from 'tassign'; 
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, CLEAR_TODOS, INCREMENT, DECREMENT } from './actions'; 

export interface IAppState {
  todos: any[];
  lastUpdate: Date; 
  newMessages: number;
}

export const INITIAL_STATE: IAppState = { 
  todos: [],
  lastUpdate: null,
  newMessages: 0
}

function addTodo(state, action) {
  var newTodo = { id: state.todos.length + 1, title: action.title };

  return tassign(state, {
    todos: state.todos.concat(newTodo),
    lastUpdate: new Date()
  });
}

function toggleTodo(state, action) {
  var todo = state.todos.find(t => t.id === action.id);

  // Now, we need to find the position of this item in the array. 
  var index = state.todos.indexOf(todo);

  return tassign(state, {
    todos: [
      ...state.todos.slice(0, index),
      tassign(todo, { isCompleted: !todo.isCompleted }),
      ...state.todos.slice(index + 1),
    ],
    lastUpdate: new Date()
  });
}

function removeTodo(state, action) {
  return tassign(state, {
    todos: state.todos.filter(t => t.id !== action.id),
    lastUpdate: new Date()
  });
}

function clearTodos(state, action) {
  return tassign(state, {
    todos: [],
    lastUpdate: new Date()
  });
}

function increment(state, action) {
  return tassign(state, { newMessages: state.newMessages + 1 });
}

function decrement(state, action) {
  return tassign(state, { newMessages: state.newMessages - 1 });
}

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case ADD_TODO: return addTodo(state, action);
    case TOGGLE_TODO: return toggleTodo(state, action);
    case REMOVE_TODO: return removeTodo(state, action);
    case CLEAR_TODOS: return clearTodos(state, action);
    case INCREMENT: return increment(state, action);
    case DECREMENT: return decrement(state, action);
  }

  return state; 
}