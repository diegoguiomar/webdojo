const { defineConfig } = require("cypress")

const { deleteUserByEmail } = require('./cypress/support/database')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        deleteUser(email) { // nome da task
          return deleteUserByEmail(email); // Ao executar a task, chama a função que deleta o usuário pelo email
        }
      })
    },
    baseUrl: 'http://localhost:3333'
  },
})
