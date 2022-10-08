import LayoutLoggedInHeader from './logged-in-header.js'
import LayoutLoggedInNav from './logged-in-nav.js'

export default class LayoutLoggedIn extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        const response = await fetch(
            new Request(
                '/themes/default/layout/logged-in.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement('template')
        template.innerHTML = await response.text()
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        if (!window.customElements.get('layout-logged-in-header')) {
            window.customElements.define('layout-logged-in-header', LayoutLoggedInHeader)
        }
        if (!window.customElements.get('layout-logged-in-nav')) {
            window.customElements.define('layout-logged-in-nav', LayoutLoggedInNav)
        }

        await this.loadPage(
            this.shadowRoot.querySelector('main'),
            this.getAttribute('pagefile')
        )
    }

    static get observedAttributes() { return ['pagefile', 'menuopen']; }

    async attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'menuopen') {
            const layoutLoggedInNav = this.shadowRoot.querySelector('layout-logged-in-nav')
            layoutLoggedInNav.setAttribute('open', newValue)
            return
        }

        if (name === 'pagefile') {
            await this.loadPage(
                this.shadowRoot.querySelector('main'),
                newValue
            )
        }
      }

      /**
       * 
       * @param {Element} pageElement
       * @param {string} pageFile
       */
      async loadPage(pageElement, pageFile) {
            if (!pageElement) {
                return
            }
            const pageFileSubFolder = pageFile.replace('./', './../')
            const webComponentName = pageFile.replace('./', ''). replace('.js', '').replace('/', '-')
    
            if(!window.customElements.get(webComponentName)) {
                const { default: Page } = await import(pageFileSubFolder)
                window.customElements.define(webComponentName, Page)
            }
    
            pageElement.appendChild(document.createElement(webComponentName))
            const response = await fetch(
                new Request(
                    '/api/config.json',
                    { method: 'GET' }
                )
            )
            pageElement.firstChild.setAttribute('theme-path', (await response.json()).themePath)
      }
}