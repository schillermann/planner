export default class ViewUsers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }

    async connectedCallback() {

        const response = await fetch(
            new Request(
                './views/user.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement('template')
        template.innerHTML = await response.text()

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.loadFormData()
    }

    async loadFormData() {
        const response = await fetch(
            new Request(
                './api/get-user?id=1',
                { method: 'GET' }
            )
        )

        if (response.status === 401) {
            window.location.hash = 'login'
            return
        }

        const user = await response.json()
        const form = this.shadowRoot.querySelector('form')
        form.innerHTML = form.innerHTML.replace('{USERNAME}', user.username)
        form.innerHTML = form.innerHTML.replace('{FIRSTNAME}', user.firstname)
        form.innerHTML = form.innerHTML.replace('{LASTNAME}', user.lastname)
        form.innerHTML = form.innerHTML.replace('{EMAIL}', user.email)
    }
}