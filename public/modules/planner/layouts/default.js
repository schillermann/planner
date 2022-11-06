import ComponentsHeader from '../components/header.js'
import ComponentNav from '../components/nav.js'

export default class LayoutDefault extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.modulePath = './modules/planner/'
    }

    async connectedCallback() {
        const response = await fetch(
            new Request(
                this.modulePath + 'layouts/default.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement('template')
        template.innerHTML = await response.text()
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        if (!window.customElements.get('component-header')) {
            window.customElements.define('component-header', ComponentsHeader)
        }
        if (!window.customElements.get('component-nav')) {
            window.customElements.define('component-nav', ComponentNav)
        }

        await this.loadPage(
            this.shadowRoot.querySelector('main'),
            this.getAttribute('pagefile')
        )
    }

    static get observedAttributes() { return ['pagefile', 'menuopen']; }

    async attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'menuopen') {
            const layoutLoggedInNav = this.shadowRoot.querySelector('component-nav')
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

            const pageFileSubFolder = pageFile.replace('./', './../../../')
            const webComponentName = pageFile.replace('./', ''). replace('.js', '').replaceAll('/', '-')
    
            if(!window.customElements.get(webComponentName)) {
                const { default: Page } = await import(pageFileSubFolder)
                window.customElements.define(webComponentName, Page)
            }
    
            pageElement.appendChild(document.createElement(webComponentName))
      }
}