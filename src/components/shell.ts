import {html} from 'lit-html/lib/lit-extended';
import {until} from 'lit-html/lib/until';
import {Dispatch} from 'redux';

import {State} from '../store';
import {navbar} from './navbar';
import {loading} from './loading';

import './shell.scss';

export const shell = (state: State, dispatch: Dispatch) => html`
	${navbar()}
	${until(
    import('./todo-list').then(({todoList}) => todoList(state, dispatch)),
    loading()
  )}
`;
