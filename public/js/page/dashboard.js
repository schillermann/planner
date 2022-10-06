export default class PageDasboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = /* html */`
            <h1>Dashboard</h1>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}