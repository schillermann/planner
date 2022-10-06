export default class LayoutLoggedInHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this.menuOpen = true
    }

    connectedCallback() {
        const template = document.createElement('template')
        template.innerHTML = /* html */`
            <style>
                nav {
                    display: flex;
                    justify-content: space-between;
                    background-color: #373433;
                    color: #ffffff;
                }
                #primary-items {
                    display: flex;
                }
                #secondary-items {

                }
                a { 
                    color: white;
                }
            </style>
            <nav>
                <section id="primary-items">
                    <button>Menu</button>
                    <label>Logo</label>
                </section>
                <section id="secondary-items">
                    <a href="#logout">LOG OUT</a>
                </section>
            </nav>
        `
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