export default class PageLogin extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.boundClickButton = event => this.clickButton(event)
    }

    /**
     * @returns {Node}
     */
    template() {
        const template = document.createElement('template')
        template.innerHTML = /* html */`
            <style>
                div {
                    font-family: sans-serif;
                    margin-top: 30vh;
                    margin-left: auto;
                    margin-right: auto;
                    min-height: 300px;
                    max-width: 360px;
                    padding: 45px;
                    text-align: center;
                    background-color: #c7dadf;
                }
                form {
                    color: #15819b;
                }
                input {
                    width: 100%;
                    border: 0;
                    margin: 0 0 15px;
                    padding: 15px;
                    box-sizing: border-box;
                }
                button {
                    text-transform: uppercase;
                    cursor: pointer;
                    color: white;
                    background-color: #15819b;
                    width: 100%;
                    border: 0;
                    padding: 15px;
                }
                #error {
                    margin-bottom: 2em;
                    min-height: 1.2em;
                }
            </style>
            <div>
                <form>
                    <h2>Log In</h2>
                    <p id="error"></p>
                    <input id="usernameOrEmail" type="text" placeholder="Username or E-Mail"/>
                    <input id="password" type="password" placeholder="Password"/>
                    <button>Login</button>
                    <p><a href="#password-reset">Forgot your password?</a></p>
                </form>
            </div>
        `
        return template.content.cloneNode(true)
    }

    connectedCallback() {
        this.shadowRoot.appendChild(this.template())

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