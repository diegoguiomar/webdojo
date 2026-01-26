import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Expert', () => {

    beforeEach(() => {
        cy.start()
    })

    it('Deve manipular os atributos de elementos do HTML', () => {
        cy.get('#email').invoke('val', 'diego.felgueiras@gmail.com')

        cy.get('#password').invoke('attr', 'type', 'text') //Altera o tipo do atributo type para texto
            .type('123456') //Defina um valor para o atributo

        cy.get('#password').invoke('attr', 'name', 'senha') //Cria um atributo name com o valor senha
            .should('have.attr', 'name') //verifica se o atributo name existe

        cy.get('#password').invoke('removeAttr', 'name') //Remove o atributo name
            .should('not.have.attr', 'name') //Verifica se o atributo name realmente foi excluído

        cy.contains('button', 'Entrar')
            .invoke('hide') // Esconde o botão entrar
            .should('not.be.visible')

        cy.contains('button', 'Entrar')
            .invoke('show') // Exibe o botão entrar
            .should('be.visible')
    })

    it('Não deve logar com senha inválida', () => {
        cy.submitLoginForm('papito@webdojo.com', 'katana1123')

        // cy.wait(2500)

        // cy.document().then((doc) => { //Acessa o documento HTML
        //     cy.writeFile('cypress/downloads/page.html', doc.documentElement.outerHTML) //Armazena o arquivo com o nome page.html no caminho determinado
        // })

        cy.get('[data-sonner-toaster=true]')
            .should('be.visible')
            .as('toast')

        cy.get('@toast')
            .find('.title')
            .should('have.text', 'Acesso negado! Tente novamente.')

        cy.wait(5000)

        cy.get('@toast')
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

        cy.wait(5000)

        cy.get('@toast')
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