import {html} from 'lit-html/lib/lit-extended';

import {Filter, Todo} from '../../store';
import {statusFilters} from './status-filters';
import {todoItem} from './todo-item';
import styles from './todo-list.scss';

export interface Props {
  activeFilter: Filter;
  todos: Todo[];
  createTodo: (event: KeyboardEvent) => void;
  deleteTodo: (id: number) => void;
  setActiveFilter: (filter: Filter) => void;
  toggleTodo: (id: number) => void;
}

export const todoList = ({
  activeFilter,
  createTodo,
  deleteTodo,
  setActiveFilter,
  todos,
  toggleTodo,
}: Props) => html`
	<section class$="${styles.content}">
		<input
			aria-label="create a todo"
			on-keydown=${createTodo}
			placeHolder="what needs to be done?"
			class$="${styles.todoInput}"
			type="text"
		/>
		${statusFilters({activeFilter, setActiveFilter})}
		<ul>
			${todos.map(todo => todoItem({...todo, deleteTodo, toggleTodo}))}
		</ul>
	</section>
`;
