import {TemplateResult} from 'lit-html';
import {until} from 'lit-html/lib/until';

import {loading} from '../components';

interface Module {
  default: () => TemplateResult;
}

export function moduleLoader(dynamicImport: () => Promise<Module>) {
  let _module: Module;
  return () => {
    if (_module) return _module.default();

    return until(
      dynamicImport().then((x: Module) => {
        _module = x;
        return x.default();
      }),
      loading()
    );
  };
}
