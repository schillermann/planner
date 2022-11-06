export default class Modules {
    constructor() {
        this.modulePath = './modules/planner/'
    }

    /**
     * @returns {array}
     */
    async configs() {
        const responseConfig = await fetch(
            new Request(
                this.modulePath + '/api/modules-config.php',
                { method: 'GET' }
            )
        )

        return await responseConfig.json()
    }

    /**
     * @returns {array}
     */
    async routes() {
        const routes = []
        for (const config of await this.configs()) {
            for (const route of config.routes) {
                routes.push(route)
            }
        }
        return routes
    }
} 