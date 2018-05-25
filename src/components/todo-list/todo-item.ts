import {html} from 'lit-html/lib/lit-extended';

import {Todo} from '../../store';
import styles from './todo-list.scss';

interface Props extends Todo {
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

export const todoItem = (props: Props) => html`
  <li class$="${styles.todo + (props.completed ? ' ' + styles.completed : '')}">
    <span on-click=${() => props.deleteTodo(props.id)}>
      🗑️
    </span>
    <p on-click=${() => props.toggleTodo(props.id)}>
      ${props.text}
		</p>
  </li>
`;
