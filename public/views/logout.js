export default class ViewLogout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = /* html */`
            <h1>Log out</h1>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const url = '/api/logout.php'
        const response = await fetch(url, { method: 'GET' })
        if (response.status !== 200) {
            console.log('logout error')
        }
        window.location.hash = '#login';
    }
}