export default class ComponentNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {

        const response = await fetch(
            new Request(
                '/themes/default/components/nav.html',
                { method: 'GET' }
            )
        )
        
        const template = document.createElement('template')
        template.innerHTML = await response.text()
        this.shadowRoot.appendChild(template.content.cloneNode(true))

        const responseConfig = await fetch(
            new Request(
                '/api/module-nav.php',
                { method: 'GET' }
            )
        )

        await this.build(await responseConfig.json())
    }

    async build(modulesNavigation = []) {
        const nav = this.shadowRoot.querySelector('nav')
        const templateSection = this.shadowRoot.querySelector('section')
        templateSection.remove()

        for (const moduleNavigation of modulesNavigation) {
            const templateClone = templateSection.cloneNode(true)

            templateClone.querySelector('header').textContent = moduleNavigation.label.en
            
            const ul = templateClone.querySelector('ul')
            const templateNavItem = ul.querySelector('li')
            templateNavItem.remove()

            for (const items of moduleNavigation.nav) {
                const liClone = templateNavItem.cloneNode(true)
                const itemLink = liClone.querySelector('a')
                itemLink.textContent = items.label.en
                itemLink.href = items.uri
                ul.appendChild(liClone)
            }

            nav.appendChild(templateClone)
        }        
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