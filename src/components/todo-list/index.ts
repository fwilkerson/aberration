import {html} from 'lit-html/lib/lit-extended';

import {
  CREATE_TODO,
  DELETE_TODO,
  Filter,
  SET_ACTIVE_FILTER,
  Todo,
  TOGGLE_TODO,
} from '../../store';
import {connect} from '../connect';
import {statusFilters} from './status-filters';
import {todoItem} from './todo-item';
import styles from './todo-list.scss';

const todoList = props => html`
  <section class$="${styles.content}">
    <input
      aria-label="create a todo"
      on-keydown=${props.createTodo}
      placeHolder="what needs to be done?"
      class$="${styles.todoInput}"
      type="text"
    />
    ${statusFilters({
      active: props.filter,
      setActiveFilter: props.setActiveFilter,
    })}
    <ul>
      ${getFilteredTodos(props.filter, props.todos).map(todo =>
        todoItem({
          ...todo,
          deleteTodo: props.deleteTodo,
          toggleTodo: props.toggleTodo,
        })
      )}
    </ul>
  </section>
`;

const idFactory = createIdFactory();

export default connect(
  state => ({filter: state.filter, todos: state.todos}),
  dispatch => ({
    createTodo: (event: KeyboardEvent) => {
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
  })
)(todoList);

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
