import {html} from 'lit-html/lib/lit-extended';
import {Dispatch} from 'redux';

import {
  CREATE_TODO,
  DELETE_TODO,
  Filter,
  State,
  SET_ACTIVE_FILTER,
  Todo,
  TOGGLE_TODO,
} from '../../store';
import {statusFilters} from './status-filters';
import {todoItem} from './todo-item';
import styles from './todo-list.scss';

export const todoList = (state: State, dispatch: Dispatch) => html`
  <section class$="${styles.content}">
    <input
      aria-label="create a todo"
      on-keydown=${todoInputKeydown(dispatch)}
      placeHolder="what needs to be done?"
      class$="${styles.todoInput}"
      type="text"
    />
    ${statusFilters({
      active: state.filter,
      setActiveFilter: filter => {
        dispatch({type: SET_ACTIVE_FILTER, payload: filter});
      },
    })}
    <ul>
      ${getFilteredTodos(state.filter, state.todos).map(todo =>
        todoItem({
          ...todo,
          deleteTodo: id => {
            dispatch({type: DELETE_TODO, payload: id});
          },
          toggleTodo: id => {
            dispatch({type: TOGGLE_TODO, payload: id});
          },
        })
      )}
    </ul>
	</section>
`;

const idFactory = createIdFactory();

function todoInputKeydown(dispatch: Dispatch) {
  return (event: KeyboardEvent) => {
    if (event.keyCode !== 13) return;
    const target = event.target as HTMLInputElement;
    if (!target || !target.value || !target.value.trim()) return;
    const todo: Todo = {
      id: idFactory.next(),
      text: target.value,
      completed: false,
    };
    dispatch({type: CREATE_TODO, payload: todo});
    target.value = '';
  };
}

function getFilteredTodos(filter: Filter, todos: Todo[]) {
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

function createIdFactory() {
  let id = 0;
  return {
    next: () => ++id,
  };
}
