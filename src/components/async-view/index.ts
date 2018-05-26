import {TemplateResult} from 'lit-html';
import {until} from 'lit-html/lib/until';

import {loading} from '../loading';

export const asyncView = (view: Promise<{default: () => TemplateResult}>) => {
  return until(view.then(x => x.default()), loading());
};
