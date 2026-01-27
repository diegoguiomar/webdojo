const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    experimentalStudio: true,
    video: true,
    baseUrl: 'http://localhost:3000'
  },
});
