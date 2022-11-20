import Modules from "../modules.js";

export default class ComponentNav extends HTMLElement {
    constructor() {
        super();
        this.modules = new Modules()
        this.attachShadow({mode: 'open'})
    }

    async connectedCallback() {

        const response = await fetch(
            new Request(
                './components/nav.html',
                { method: 'GET' }
            )
        )
        
        const template = document.createElement('template')
        template.innerHTML = await response.text()
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        await this.build()
    }

    async build() {
        const nav = this.shadowRoot.querySelector('nav')
        const templateSection = this.shadowRoot.querySelector('section')
        templateSection.remove()

        for (const config of await this.modules.configs()) {
            const templateClone = templateSection.cloneNode(true)

            templateClone.querySelector('header > h1').textContent = config.label.en
            
            const ul = templateClone.querySelector('ul')
            const templateNavItem = ul.querySelector('li')
            templateNavItem.remove()

            for (const route of config.routes) {
                if (route.hidden === true) {
                    continue
                }
                const liClone = templateNavItem.cloneNode(true)
                const itemLink = liClone.querySelector('a')
                itemLink.textContent = route.label.en
                itemLink.href = route.uri
                ul.appendChild(liClone)
            }

            nav.appendChild(templateClone)
        }        
    }

    static get observedAttributes() { return ['open']; }

    async attributeChangedCallback(name, oldValue, newValue) {
        if (name !== 'open') {
            return
        }
        const nav = this.shadowRoot.querySelector('nav')
        if (!nav) {
            return
        }

        if (newValue === 'true') {
            nav.style.display = 'block'
            return
        }

        nav.style.display = 'none'
    }
}