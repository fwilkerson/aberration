import {render, html} from 'lit-html/lib/lit-extended';

import {store} from './store';
import {navbar} from './components/navbar';
import {asyncView} from './components/async-view';

import './shell.scss';

function renderShell() {
  const shell = html`
    ${navbar()}
    ${asyncView(import('./components/todo-list'))}
  `;
  render(shell, document.body);
}

renderShell();

store.subscribe(renderShell);
