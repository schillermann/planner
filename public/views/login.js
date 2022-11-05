export default class ViewLogin extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.boundClickButton = event => this.clickButton(event)
    }

    async connectedCallback() {

        const response = await fetch(
            new Request(
                '/themes/default/views/login.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement('template')
        template.innerHTML = await response.text()
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.shadowRoot
            .querySelector('button')
            .addEventListener('click', this.boundClickButton)
            
    }

    async clickButton(event) {
        event.preventDefault();

        const credentials = {
            username: this.shadowRoot.getElementById('usernameOrEmail').value,
            password: this.shadowRoot.getElementById('password').value
        }

        const url = '/api/login.php'

        const response = await fetch(
            url,
            {
                method: 'POST',
                body: JSON.stringify(credentials)
            }
        )

        if (response.status === 200) {
            this.dispatchEvent(
                new Event(
                    'loggedin',
                    {
                        bubbles: true,
                        composed: true
                    }
                )
            )
        } else {
            this.shadowRoot.getElementById('error').innerHTML = 'Wrong Credentials'
        }
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('button').removeEventListener('click', this.boundClickButton);
    }
}