import {Dispatch} from 'redux';

// @ts-ignore
import Worker from 'workerize-loader!../services/remote-data.worker.ts';
import {RemoteDataService} from '../services';
import {
  CREATING_TODO,
  CREATE_TODO,
  DELETING_TODO,
  DELETE_TODO,
  Filter,
  RECEIVE_TODOS,
  SET_ACTIVE_FILTER,
  State,
  Todo,
  UPDATING_TODO,
  UPDATE_TODO,
} from '../store';
import {connect} from '../lib';
import {todoList, ExtendedTodo, Props} from '../components/todo-list';

const dataService: RemoteDataService = new Worker();

function stateToProps(state: State): Partial<Props> {
  return {
    activeFilter: state.filter,
    isCreating: state.isCreating,
    todos: getFilteredTodos(state),
  };
}

function dispatchToProps(
  dispatch: Dispatch,
  getState: () => State
): Partial<Props> {
  return {
    createTodo: (event: KeyboardEvent) => {
      if (event.keyCode !== 13) return;
      const target = event.target as HTMLInputElement;
      if (!target || !target.value || !target.value.trim()) return;
      const todo: Todo = {
        id: -1,
        text: target.value,
        completed: false,
      };
      dispatch({type: CREATING_TODO, payload: todo});
      dataService.createTodo(target.value).then(created => {
        dispatch({type: CREATE_TODO, payload: created});
      });
      target.value = '';
    },
    setActiveFilter: (filter: Filter) => {
      dispatch({type: SET_ACTIVE_FILTER, payload: filter});
    },
    deleteTodo: (id: number) => {
      dispatch({type: DELETING_TODO, payload: id});
      dataService.deleteTodo(id).then(result => {
        if (!result) return; // Todo Error Handling
        dispatch({type: DELETE_TODO, payload: id});
      });
    },
    toggleTodo: (todo: Todo) => {
      const toUpdate: Todo = {
        id: todo.id,
        text: todo.text,
        completed: !todo.completed,
      };
      dispatch({type: UPDATING_TODO, payload: toUpdate});
      dataService.updateTodo(toUpdate).then(updated => {
        dispatch({type: UPDATE_TODO, payload: updated});
      });
    },
  };
}

function initialize(dispatch: Dispatch, getState: () => State) {
  dataService.getTodos().then(todos => {
    dispatch({type: RECEIVE_TODOS, payload: todos});
  });
}

export function getFilteredTodos({
  filter,
  isCreating,
  pendingChanges,
  todos,
}: State): ExtendedTodo[] {
  const withPendingChanges = (todo: Todo) => ({
    ...todo,
    hasPendingChanges:
      (isCreating && todo.id === -1) || !!pendingChanges[todo.id],
  });
  switch (filter) {
    case Filter.Completed:
      return todos.filter(x => x.completed).map(withPendingChanges);
    case Filter.Incomplete:
      return todos.filter(x => !x.completed).map(withPendingChanges);
    case Filter.All:
    default:
      return todos.map(withPendingChanges);
  }
}

export default connect(stateToProps, dispatchToProps, initialize)(todoList);
