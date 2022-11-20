export default class Modules {
    /**
     * @returns {array}
     */
    async configs() {
        const responseConfig = await fetch(
            new Request(
                './api/modules/configs',
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
                routes.push({
                    uri: route.uri,
                    layoutFile: route.layoutFile,
                    viewFile: route.viewFile
                })
            }
        }
        return routes
    }
} 