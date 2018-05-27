import {html} from 'lit-html/lib/lit-extended';

import {Todo} from '../../store';
import styles from './todo-list.scss';

export interface Props extends Todo {
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const todoItem = ({deleteTodo, toggleTodo, ...todo}: Props) => html`
  <li class$="${styles.todo + (todo.completed ? ' ' + styles.completed : '')}">
    <span on-click=${() => deleteTodo(todo.id)}>🗑️</span>
    <p on-click=${() => toggleTodo(todo.id)}>${todo.text}</p>
  </li>
`;
