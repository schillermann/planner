export default class LayoutLoggedInNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        const response = await fetch(
            new Request(
                '/themes/default/layout/logged-in-nav.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement('template')
        template.innerHTML = await response.text()
        this.shadowRoot.appendChild(template.content.cloneNode(true))
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