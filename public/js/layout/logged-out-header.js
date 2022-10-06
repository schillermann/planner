export default class LayoutLoggedOutHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        const template = document.createElement("template")
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
                h1 {
                    margin: 0px;
                }
            </style>
            <nav>
                <section id="primary-items">
                    <img src="images/logo.jpg" width="48" height="48" />
                    <h1>Demo</h1>
                </section>
            </nav>
        `
        this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
}