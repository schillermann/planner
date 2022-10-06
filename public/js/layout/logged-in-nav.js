export default class LayoutLoggedInNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        const template = document.createElement('template')
        template.innerHTML = /* html */`
        <style>
            nav {
                float: left;
            }
            ul {
                border: 1px solid;
            }
        </style>
        <nav>
            <ul>
                <li><a href="#">Dashboard</a></li>
                <li><a href="#userlist">User List</a></li>
            </ul>
        </nav>
        `
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