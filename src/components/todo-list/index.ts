import {html} from 'lit-html/lib/lit-extended';

import {Filter, Todo} from '../../store';
import {statusFilters} from './status-filters';
import {todoItem} from './todo-item';
import styles from './todo-list.scss';

export interface ExtendedTodo extends Todo {
  hasPendingChanges: boolean;
}

export interface Props {
  activeFilter: Filter;
  createTodo: (event: KeyboardEvent) => void;
  deleteTodo: (id: number) => void;
  isCreating: boolean;
  setActiveFilter: (filter: Filter) => void;
  todos: ExtendedTodo[];
  toggleTodo: (todo: ExtendedTodo) => void;
}

export const todoList = ({
  activeFilter,
  createTodo,
  deleteTodo,
  isCreating,
  setActiveFilter,
  todos,
  toggleTodo,
}: Props) => html`
	<section class$="${styles.content}">
		<input
      aria-label="create a todo"
      autofocus
      class$="${styles.todoInput}"
      disabled=${isCreating}
			on-keydown=${createTodo}
			placeHolder="what needs to be done?"
			type="text"
		/>
		${statusFilters({activeFilter, setActiveFilter})}
		<ul>
			${todos.map(todo => todoItem({...todo, deleteTodo, toggleTodo}))}
		</ul>
	</section>
`;
