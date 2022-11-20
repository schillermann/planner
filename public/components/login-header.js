export default class ComponentLoginHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"})
    }

    async connectedCallback() {
        const response = await fetch(
            new Request(
                './components/login-header.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement("template")
        template.innerHTML = await response.text()
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}