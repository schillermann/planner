const routes = [
    {
        uri: '',
        layoutFile: './layout/logged-in.js',
        pageFile: './page/dashboard.js'
    },
    {
        uri: '#logout',
        layoutFile: './layout/logged-in.js',
        pageFile: './page/logout.js'
    },
    {
        uri: '#userlist',
        layoutFile: './layout/logged-in.js',
        pageFile: './page/user-list.js'
    },
    {
        uri: '#login',
        layoutFile: './layout/logged-out.js',
        pageFile: './page/login.js'
    }
]

const layout = document.querySelector('layout')

async function setPage() {
    const route = routes.find(e => e.uri === window.location.hash)
    if (!route) {
        return
    }

    const webComponentName = route.layoutFile.replace('./', ''). replace('.js', '').replace('/', '-')
    const { default: Layout } = await import(route.layoutFile)
    if (!window.customElements.get(webComponentName)) {
        window.customElements.define(webComponentName, Layout)
    }

    if (layout.firstChild) {
        layout.removeChild(layout.firstChild)
    }

    layout.appendChild(document.createElement(webComponentName)).setAttribute('pagefile', route.pageFile)
}

await setPage()
window.addEventListener('hashchange', setPage) 

window.addEventListener('menuopen', function(event) {

    const layoutLoggedIn = layout.querySelector('layout-logged-in')
    
    if (!layoutLoggedIn) {
        return
    }

    layoutLoggedIn.setAttribute('menuopen', true)
})

window.addEventListener('menuclose', function(event) {
    const layoutLoggedIn = layout.querySelector('layout-logged-in')
    if (!layoutLoggedIn) {
        return
    }
    layoutLoggedIn.setAttribute('menuopen', false)
})

window.addEventListener('loggedin', function(event) {
    window.location.hash = '#userlist'
})

window.addEventListener('loggedout', function(event) {
    window.location.hash = '#login';
})