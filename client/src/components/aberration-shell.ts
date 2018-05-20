import {LitElement, html} from '@polymer/lit-element';

class AberrationShell extends LitElement {
  _render() {
    return html`
      <main>
        <section class="section">
          <h1 class="title">Aberration</h1>
        </section>
      </main>
    `;
  }
}

customElements.define('aberration-shell', AberrationShell);
