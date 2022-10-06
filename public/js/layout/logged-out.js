import LayoutLoggedOutHeader from './logged-out-header.js'
import PageLogin from '../page/login.js'

export default class LayoutLoggedOut extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        const template = document.createElement('template')
        template.innerHTML = /* html */`
            <layout-logged-out-header></layout-logged-out-header>
            <layout-logged-out-main></layout-logged-out-main>
        `
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        window.customElements.define('layout-logged-out-header', LayoutLoggedOutHeader)
        window.customElements.define('layout-logged-out-main', PageLogin)
    }
}