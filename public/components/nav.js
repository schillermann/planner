export default class ComponentNav extends HTMLElement {
    constructor() {
        super()
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
        const navElement = this.shadowRoot.querySelector('nav')

        const response = await fetch(
            new Request(
                './api/get-nav',
                { method: 'GET' }
            )
        )

        const navConfig = await response.json()

        for (const navConfigSection of navConfig) {
            if (navConfigSection.hasOwnProperty('label')) {
                const navTemplate = this.shadowRoot.getElementById('template-nav-with-header').content.cloneNode(true)
                this.addItemsWithHeader(navTemplate, navElement, navConfigSection)
            } else {
                const navTemplate = this.shadowRoot.getElementById('template-nav').content.cloneNode(true)
                this.addItemsToList(navTemplate, navElement, navConfigSection.routes)
            }
        }
    }

    addItemsWithHeader(template, nav, config) {
        template.querySelector('header > h1').textContent = config.label.en
        this.addItemsToList(template, nav, config.routes)
    }

    addItemsToList(template, nav, routes) {
        const ul = template.querySelector('ul')

        const li = template.querySelector('ul > li')
        li.remove()

        for (const route of routes) {
            const liClone = li.cloneNode(true)
            const a = liClone.querySelector('a')
            a.textContent = route.label.en
            a.setAttribute('href', route.uri)
            ul.appendChild(liClone)
        }
        
        nav.appendChild(template)
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