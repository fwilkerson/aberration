import {render, html} from 'lit-html/lib/lit-extended';

import {navbar} from './components';
import {moduleLoader} from './lib';
import {store} from './store';

const asyncTodoList = moduleLoader(() => import('./modules/todo-list'));

function renderShell() {
  const shell = html`
    ${navbar()}
    ${asyncTodoList()}
  `;
  render(shell, document.body);
}

renderShell();

store.subscribe(renderShell);
