const { defineConfig } = require("cypress")

const { deleteUserByEmail } = require('./cypress/support/database')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        deleteUser(email) { 
          return deleteUserByEmail(email);
        }
      })
    },
    baseUrl: 'http://localhost:3333'
  },
})
