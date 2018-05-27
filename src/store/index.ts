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
  todos: Todo[];
}

const init: State = {
  filter: Filter.All,
  todos: [],
};

export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER';
export const TOGGLE_TODO = 'TOGGLE_TODO';

const handler: {[key: string]: (prev: State, payload: any) => any} = {
  [CREATE_TODO]: ({todos}: State, todo: Todo) => {
    return {todos: todos.concat(todo)};
  },
  [DELETE_TODO]: ({todos}: State, todoId: number) => {
    return {todos: todos.filter(todo => todo.id !== todoId)};
  },
  [RECEIVE_TODOS]: (prev: State, todos: Todo[]) => {
    return {todos};
  },
  [SET_ACTIVE_FILTER]: (prev: State, filter: Filter) => {
    return {filter};
  },
  [TOGGLE_TODO]: ({todos}: State, todoId: number) => {
    const next = todos.map(todo => {
      return todo.id === todoId ? {...todo, completed: !todo.completed} : todo;
    });

    return {todos: next};
  },
};

const reducer: Reducer = (state = init, {type, payload}) => {
  return handler[type] ? {...state, ...handler[type](state, payload)} : state;
};

export const store = createStore(
  reducer,
  applyMiddleware(createLogger({collapsed: true}))
);
