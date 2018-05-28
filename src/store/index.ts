import {applyMiddleware, createStore, Reducer} from 'redux';
// @ts-ignore
import {createLogger} from 'redux-logger';

export enum Filter {
  All = 'All',
  Completed = 'Completed',
  Incomplete = 'Incomplete',
}

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface State {
  filter: Filter;
  isCreating: boolean;
  pendingChanges: {[key: number]: {old: Todo}};
  todos: Todo[];
}

const init: State = {
  filter: Filter.All,
  isCreating: false,
  pendingChanges: {},
  todos: [],
};

export const CREATING_TODO = 'CREATING_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETING_TODO = 'DELETING_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER';
export const UPDATING_TODO = 'UPDATING_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

type Handler = {[key: string]: (prev: State, payload: any) => Partial<State>};

const handler: Handler = {
  [CREATING_TODO]: ({todos}: State, todo: Todo): Partial<State> => {
    return {todos: todos.concat(todo), isCreating: true};
  },
  [CREATE_TODO]: ({todos}: State, todo: Todo): Partial<State> => {
    return {todos: todos.map(x => (x.id === -1 ? todo : x)), isCreating: false};
  },
  [DELETING_TODO]: (prev: State, todoId: number): Partial<State> => {
    const {pendingChanges, todos} = prev;
    const toDelete = todos.find(x => x.id === todoId);
    if (!toDelete) return prev; // Todo: Handle Error
    return {pendingChanges: {...pendingChanges, [todoId]: {old: toDelete}}};
  },
  [DELETE_TODO]: (prev: State, todoId: number): Partial<State> => {
    let next = {...prev.pendingChanges};
    delete next[todoId];
    return {
      todos: prev.todos.filter(todo => todo.id !== todoId),
      pendingChanges: next,
    };
  },
  [RECEIVE_TODOS]: (prev: State, todos: Todo[]): Partial<State> => {
    return {todos};
  },
  [SET_ACTIVE_FILTER]: (prev: State, filter: Filter): Partial<State> => {
    return {filter};
  },
  [UPDATING_TODO]: (prev: State, todo: Todo): Partial<State> => {
    const {todos, pendingChanges} = prev;
    const toUpdate = todos.find(x => x.id === todo.id);
    if (!toUpdate) return prev; // Todo: Handle Error
    const next = todos.map(x => (x.id === todo.id ? todo : x));
    return {
      todos: next,
      pendingChanges: {...pendingChanges, [todo.id]: {old: toUpdate}},
    };
  },
  [UPDATE_TODO]: ({pendingChanges}: State, todo: Todo) => {
    let next = {...pendingChanges};
    delete next[todo.id];
    return {pendingChanges: next};
  },
};

const reducer: Reducer = (state = init, {type, payload}) => {
  return handler[type] ? {...state, ...handler[type](state, payload)} : state;
};

export const store = createStore(
  reducer,
  applyMiddleware(createLogger({collapsed: true}))
);
