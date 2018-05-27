import {html} from 'lit-html/lib/lit-extended';

import {Filter} from '../../store';
import {classNames} from '../utils';
import styles from './todo-list.scss';

export interface Props {
  activeFilter: Filter;
  setActiveFilter: (filter: Filter) => void;
}

const filters = Object.keys(Filter);

export const statusFilters = ({activeFilter, setActiveFilter}: Props) => {
  const toFilterView = (filter: string) => html`
    <button
      class$="${classNames(styles.filterButton, {
        [styles.active]: filter === activeFilter,
      })}"
      on-click=${() => setActiveFilter(filter as Filter)}
    >
      ${filter}
    </button>
  `;

  return html`
    <div class$="${styles.filters}">
      ${filters.map(toFilterView)}
    </div>
  `;
};
