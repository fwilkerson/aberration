import {TemplateResult} from 'lit-html';
import {Dispatch} from 'redux';

import {State, store} from '../../store';

type Connect = (
  stateToProps: (state: State) => Object,
  dispatchToProps: (dispatch: Dispatch) => Object
) => (
  view: (...args: any[]) => TemplateResult,
  ...args: any[]
) => TemplateResult;

export const connect: Connect = (stateToProps, dispatchToProps) => {
  return (view, ...args) => {
    return view({
      ...stateToProps(store.getState()),
      ...dispatchToProps(store.dispatch),
      ...args,
    });
  };
};
