export default class ViewDasboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this.modulePath = './modules/trolleydienst/'
    }

    async connectedCallback() {
        const response = await fetch(
            new Request(
                this.modulePath + 'views/routes.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement('template');
        template.innerHTML = await response.text()

        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}