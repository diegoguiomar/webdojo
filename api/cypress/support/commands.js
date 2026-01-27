Cypress.Commands.add('postUser', (user) => {
  return cy.api({
    method: 'POST',
    url: '/api/users/register',
    body: user,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('getUsers', () => {
  cy.api({
    method: 'GET',
    url: '/api/users',
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('putUser', (userId, updatedUser) => {
  return cy.api({
    method: 'PUT',
    url: '/api/users/' + userId,
    headers: {
      'Content-Type': 'application/json'
    },
    body: updatedUser,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteUser', (userId) => {
  cy.api({
    method: 'DELETE',
    url: '/api/users/' + userId,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  })
})