import {createStore, Reducer} from 'redux';

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

export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

const handler: {[key: string]: (prev: State, payload: any) => any} = {
  [SET_ACTIVE_FILTER]: (prev: State, filter: Filter) => {
    return {filter};
  },
  [CREATE_TODO]: ({todos}: State, todo: Todo) => {
    return {todos: todos.concat(todo)};
  },
  [DELETE_TODO]: ({todos}: State, todoId: number) => {
    return {todos: todos.filter(todo => todo.id !== todoId)};
  },
  [TOGGLE_TODO]: ({todos}: State, todoId: number) => {
    return {
      todos: todos.map(todo => {
        return todo.id === todoId
          ? {...todo, completed: !todo.completed}
          : todo;
      }),
    };
  },
};

const reducer: Reducer = (state = init, {type, payload}) => {
  return handler[type] ? {...state, ...handler[type](state, payload)} : state;
};

export const store = createStore(reducer);
