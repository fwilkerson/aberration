import {render} from 'lit-html/lib/lit-extended';

import {shell} from './components/shell';
import {store} from './store';

render(shell(store.getState(), store.dispatch), document.body);

store.subscribe(() => {
  render(shell(store.getState(), store.dispatch), document.body);
});
