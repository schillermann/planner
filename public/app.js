import Modules from './modules.js'

const routes = await new Modules().routes()
routes.push({
    layoutFile: "./layouts/default.js",
    uri: "",
    viewFile: "./views/home.js"
})

const app = document.getElementById('app')

/**
 * @param {string} word 
 * @returns {string}
 */
function pascalCaseToKebabCase(word) {
    return word.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase()
}

async function setView() {
    const route = routes.find(e => e.uri === window.location.hash)
    if (!route) {
        return
    }

    const layout = await import(route.layoutFile)
    const componentName = pascalCaseToKebabCase(layout.default.name)

    if (!window.customElements.get(componentName)) {
        window.customElements.define(componentName, layout.default)
    }

    if (app.firstChild) {
        app.removeChild(app.firstChild)
    }

    app.appendChild(document.createElement(componentName)).setAttribute('pagefile', route.viewFile)
}

await setView()
window.addEventListener('hashchange', setView) 

window.addEventListener('menuopen', function(event) {

    const layoutLoggedIn = app.querySelector('layout-default')
    
    if (!layoutLoggedIn) {
        return
    }

    layoutLoggedIn.setAttribute('menuopen', true)
})

window.addEventListener('menuclose', function(event) {
    const layoutLoggedIn = app.querySelector('layout-default')
    if (!layoutLoggedIn) {
        return
    }
    layoutLoggedIn.setAttribute('menuopen', false)
})

window.addEventListener('loggedin', function(event) {
    window.location.hash = ''
})

window.addEventListener('loggedout', function(event) {
    window.location.hash = '#login'
})