export default class ViewUsers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
    }

    async connectedCallback() {

        const response = await fetch(
            new Request(
                './views/users.html',
                { method: 'GET' }
            )
        )

        const template = document.createElement('template')
        template.innerHTML = await response.text()

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        await this.build()
    }

    async build() {
        const response = await fetch(
            new Request(
                './api/get-users',
                { method: 'GET' }
            )
        )
        if (response.status === 401) {
            window.location.hash = 'login'
            return
        }

        for (const user of await response.json()) {
            const document = this.shadowRoot.querySelector('template#row').content.cloneNode(true)
            const row = document.querySelector('tr')

            row.innerHTML = row.innerHTML.replace('{USERNAME}', user.username)
            row.innerHTML = row.innerHTML.replace('{FIRSTNAME}', user.firstname)
            row.innerHTML = row.innerHTML.replace('{LASTNAME}', user.lastname)
            row.innerHTML = row.innerHTML.replace('{EMAIL}', user.email)

            this.shadowRoot.querySelector('tbody').appendChild(document)
        }
    }
}