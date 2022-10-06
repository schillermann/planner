import LayoutLoggedInHeader from './logged-in-header.js'
import LayoutLoggedInNav from './logged-in-nav.js'

export default class LayoutLoggedIn extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        const template = document.createElement('template')
        template.innerHTML = /* html */`
            <layout-logged-in-header></layout-logged-in-header>
            <layout-logged-in-nav open="true"></layout-logged-in-nav>
            <layout-logged-in-main></layout-logged-in-main>
        `
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        if (!window.customElements.get('layout-logged-in-header')) {
            window.customElements.define('layout-logged-in-header', LayoutLoggedInHeader)
        }
        if (!window.customElements.get('layout-logged-in-nav')) {
            window.customElements.define('layout-logged-in-nav', LayoutLoggedInNav)
        }
    }

    static get observedAttributes() { return ['pagefile', 'menuopen']; }

    async attributeChangedCallback(name, oldValue, newValue) {

        if (name === 'menuopen') {
            const layoutLoggedInNav = this.shadowRoot.querySelector('layout-logged-in-nav')
            layoutLoggedInNav.setAttribute('open', newValue)
            return
        }

        if (name === 'pagefile') {
            const main = this.shadowRoot.querySelector('layout-logged-in-main')
            const pageFile = newValue.replace('./', './../')
            const webComponentName = newValue.replace('./', ''). replace('.js', '').replace('/', '-')
    
            if(!window.customElements.get(webComponentName)) {
                const { default: Page } = await import(pageFile)
                window.customElements.define(webComponentName, Page)
            }
    
            main.appendChild(document.createElement(webComponentName))
        }
      }
}