import LayoutLoggedOutHeader from './logged-out-header.js'
import PageLogin from '../page/login.js'

export default class LayoutLoggedOut extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        const response = await fetch(
            new Request(
                '/themes/default/layout/logged-out.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement('template')
        template.innerHTML = await response.text()
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        window.customElements.define('layout-logged-out-header', LayoutLoggedOutHeader)
        window.customElements.define('layout-logged-out-main', PageLogin)
    }
}