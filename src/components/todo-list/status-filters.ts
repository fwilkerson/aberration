import {html} from 'lit-html/lib/lit-extended';

import {Filter} from '../../store';
import styles from './todo-list.scss';

interface Props {
  active: Filter;
  setActiveFilter: (filter: Filter) => void;
}

const filters = Object.keys(Filter);

export const statusFilters = (props: Props) => html`
  <div class$="${styles.filters}">
    ${filters.map(filter => {
      const activeStyle = filter === props.active ? ' ' + styles.active : '';
      return html`
        <button
          class$="${styles.filterButton + activeStyle}"
          on-click=${() => props.setActiveFilter(filter as Filter)}
        >
          ${filter}
        </button>
      `;
    })}
  </div>
`;
