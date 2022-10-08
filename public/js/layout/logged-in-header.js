export default class LayoutLoggedInHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this.menuOpen = true
    }

    async connectedCallback() {
        const response = await fetch(
            new Request(
                '/themes/default/layout/logged-in-header.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement('template')
        template.innerHTML = await response.text()
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.shadowRoot.querySelector('button').addEventListener('click', (event) => {

            if (this.menuOpen) {
                this.dispatchEvent(
                    new Event(
                        'menuclose',
                        {
                            bubbles: true,
                            composed: true
                        }
                    )
                )
                this.menuOpen = false
                return
            }

            this.dispatchEvent(
                new Event(
                    'menuopen',
                    {
                        bubbles: true,
                        composed: true
                    }
                )
            )
            this.menuOpen = true
        })
    }
}