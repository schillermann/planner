export default class PageUserList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {

        const template = document.createElement('template')
        template.innerHTML += /* html */`
            <style>
                table {
                    border-collapse: collapse;
                }
                table, th, td {
                    border: 1px solid;
                }
                </style>
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>firstname</th>
                        <th>lastname</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true))  
        
        const url = '/api/userlist.php'

        const response = await fetch(
            url,
            { method: 'GET' }
        )

        for (const user of await response.json()) {
            const row = document.createElement('tr')
            const cellUsername = document.createElement('td')
            const cellFirstname = document.createElement('td')
            const cellLastname = document.createElement('td')
            const cellEmail = document.createElement('td')

            const cellTextUsername = document.createTextNode(user.username)
            const cellTextFirstname = document.createTextNode(user.firstname)
            const cellTextLastname = document.createTextNode(user.lastname)
            const cellTextEmail = document.createTextNode(user.email)

            cellUsername.appendChild(cellTextUsername)
            cellFirstname.appendChild(cellTextFirstname)
            cellLastname.appendChild(cellTextLastname)
            cellEmail.appendChild(cellTextEmail)

            row.appendChild(cellUsername)
            row.appendChild(cellFirstname)
            row.appendChild(cellLastname)
            row.appendChild(cellEmail)
            this.shadowRoot.querySelector('tbody').appendChild(row)
         }
    }
}