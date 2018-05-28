import {TemplateResult} from 'lit-html';
import {Dispatch} from 'redux';

import {State, store} from '../store';

export function connect<T>(
  stateToProps: (state: State) => Partial<T>,
  dispatchToProps?: (dispatch: Dispatch, getState: () => State) => Partial<T>,
  initialize?: (dispatch: Dispatch, getState: () => State) => void
) {
  initialize && initialize(store.dispatch, store.getState());
  return (viewFunction: (props: T) => TemplateResult) => (
    props?: Partial<T>
  ): TemplateResult => {
    return viewFunction(Object.assign(
      {},
      stateToProps(store.getState()),
      dispatchToProps && dispatchToProps(store.dispatch, store.getState),
      props
    ) as T);
  };
}
