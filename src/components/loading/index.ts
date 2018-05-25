import {html} from 'lit-html/lib/lit-extended';

import styles from './loading.scss';

export const loading = () => html`
	<div class$="${styles.loading}">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
`;
