import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Expert', () => {

    beforeEach(() => {
        cy.start()
    })

    it('Deve manipular os atributos de elementos do HTML', () => {
        cy.get('#email').invoke('val', 'diego.felgueiras@gmail.com')

        cy.get('#password').invoke('attr', 'type', 'text') 
            .type('123456') 

        cy.get('#password').invoke('attr', 'name', 'senha') 
            .should('have.attr', 'name') 

        cy.get('#password').invoke('removeAttr', 'name') 
            .should('not.have.attr', 'name') 

        cy.contains('button', 'Entrar')
            .invoke('hide')
            .should('not.be.visible')

        cy.contains('button', 'Entrar')
            .invoke('show')
            .should('be.visible')
    })

    it('Não deve logar com senha inválida', () => {
        cy.submitLoginForm('papito@webdojo.com', 'katana1123')

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.get('@toast', { timeout: 5000 })
            .should('not.exist')
    })

    it('Simulando a tecla TAB com cy.press()', () => {
        cy.get('body').press('Tab')
            .focused().should('have.attr', 'id', 'email')

        cy.get('#email').press('Tab')
            .focused().should('have.attr', 'id', 'password')
    })

    it('Simulando a tecla Enter para submeter o formulário', () => {
        cy.get('#email').type('papito@webdojo.com')
        cy.get('#password').type('katana1123{Enter}')

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.get('@toast', { timeout: 5000 })
            .should('not.exist')
    })

    it('Deve realizar uma carga de dados fakes', () => {
        _.times(5, () => {
            const name = faker.person.fullName()
            const email = faker.internet.email()
            const password = 'Abc_123'

            cy.log(name)
            cy.log(email)
            cy.log(password)
        })
    })
})