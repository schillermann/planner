import ComponentLoginHeader from '../components/login-header.js'
import ViewLogin from '../views/login.js'

export default class LayoutLogin extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        const response = await fetch(
            new Request(
                '/themes/default/layouts/login.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement('template')
        template.innerHTML = await response.text()
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        window.customElements.define('component-login-header', ComponentLoginHeader)
        window.customElements.define('view-login', ViewLogin)
    }
}