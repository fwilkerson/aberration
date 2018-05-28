import {html} from 'lit-html/lib/lit-extended';

import {ExtendedTodo} from '../todo-list';
import {classNames} from '../utils';
import styles from './todo-list.scss';

export interface Props extends ExtendedTodo {
  deleteTodo: (id: number) => void;
  toggleTodo: (todo: ExtendedTodo) => void;
}

export const todoItem = ({deleteTodo, toggleTodo, ...todo}: Props) => html`
  <li class$="${classNames(styles.todo, {
    [styles.completed]: todo.completed,
    [styles.hasPendingChanges]: todo.hasPendingChanges,
  })}">
    <button
      class$="${styles.emojiButton}"
      disabled=${todo.hasPendingChanges}
      on-click=${() => deleteTodo(todo.id)}>🗑️</button>
    <button
      disabled=${todo.hasPendingChanges}
      on-click=${() => toggleTodo(todo)}>
      <p>${todo.text}</p>
    </button>
  </li>
`;
