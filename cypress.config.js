const { defineConfig } = require('cypress')
const { removeDefaultUser } = require('./cypress/tasks/removeDefaultUser')

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on('task', {
                removeUser({ id }) {
                    removeDefaultUser(id)
                    return null
                },
            })
        },
        baseUrl: 'http://localhost:3000',
    },
})
