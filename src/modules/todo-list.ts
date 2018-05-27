import {Dispatch} from 'redux';

// @ts-ignore
import Worker from 'workerize-loader!../services/remote-data.worker.ts';
import {RemoteDataService} from '../services';
import {
  CREATE_TODO,
  DELETE_TODO,
  Filter,
  RECEIVE_TODOS,
  SET_ACTIVE_FILTER,
  State,
  Todo,
  TOGGLE_TODO,
} from '../store';
import {connect} from '../lib';
import {todoList, Props} from '../components/todo-list';

const dataService: RemoteDataService = new Worker();

function stateToProps({filter, todos}: State): Partial<Props> {
  return {
    activeFilter: filter,
    todos: getFilteredTodos(filter, todos),
  };
}

function dispatchToProps(dispatch: Dispatch): Partial<Props> {
  return {
    createTodo: (event: KeyboardEvent) => {
      if (event.keyCode !== 13) return;
      const target = event.target as HTMLInputElement;
      if (!target || !target.value || !target.value.trim()) return;
      dataService.createTodo(target.value).then(todo => {
        dispatch({type: CREATE_TODO, payload: todo});
      });
      target.value = '';
    },
    setActiveFilter: (filter: Filter) => {
      dispatch({type: SET_ACTIVE_FILTER, payload: filter});
    },
    deleteTodo: (id: number) => {
      dispatch({type: DELETE_TODO, payload: id});
    },
    toggleTodo: (id: number) => {
      dispatch({type: TOGGLE_TODO, payload: id});
    },
  };
}

function initialize(dispatch: Dispatch, getState: () => State) {
  dataService.getTodos().then(todos => {
    dispatch({type: RECEIVE_TODOS, payload: todos});
  });
}

export function getFilteredTodos(filter: Filter, todos: Todo[]) {
  switch (filter) {
    case Filter.Completed:
      return todos.filter(x => x.completed);
    case Filter.Incomplete:
      return todos.filter(x => !x.completed);
    case Filter.All:
    default:
      return todos;
  }
}

export default connect(stateToProps, dispatchToProps, initialize)(todoList);
