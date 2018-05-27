import {render, html} from 'lit-html/lib/lit-extended';
import {until} from 'lit-html/lib/until';

import {store} from './store';
import {loading, navbar} from './components';

function renderShell() {
  const shell = html`
    ${navbar()}
    ${until(import('./modules/todo-list').then(x => x.default()), loading())}
  `;
  render(shell, document.body);
}

renderShell();

store.subscribe(renderShell);
