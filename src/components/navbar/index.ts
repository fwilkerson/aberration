import {html} from 'lit-html/lib/lit-extended';

import styles from './navbar.scss';

export const navbar = () => html`
  <header class$="${styles.navbar}">
    <nav>
      <a tabindex='-1' class$="${styles.brand}" href="#">re|muve</a>
    </nav>
  </header>
`;
