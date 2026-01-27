describe('Gerenciamento de perfis do GitHub', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo perfil do GitHub', () => {
        cy.get('#name').type('Diego Guiomar')
        cy.get('#username').type('diegoguiomarqa')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.get('#name').type('Diego Guiomar')
        cy.get('#username').type('diegoguiomar')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody td', /^diegoguiomar$/)
            .parent('tr')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('td', 'Diego Guiomar')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('td', 'QA')
            .should('be.visible')
    })

    it('Deve poder remover um perfil do GitHub', () => {
        const profile = {
            name: 'Diego Guiomar',
            username: 'diegoguiomar',
            desc: 'QA'
        }

        cy.get('#name').type('Diego Guiomar')
        cy.get('#username').type('diegoguiomarqa')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody td', /^diegoguiomarqa$/)
            .parent('tr')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('button[title="Remover perfil"]')
            .click()

        cy.contains('table tbody', /^diegoguiomarqa$/)
            .should('not.exist')
    })

    it('Deve validar o link do GitHub', () => {
        const profile = {
            name: 'Diego Guiomar',
            username: 'diegoguiomar',
            desc: 'QA'
        }

        cy.get('#name').type('Diego Guiomar')
        cy.get('#username').type('diegoguiomarqa')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody td', /^diegoguiomar$/)
            .parent('tr')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('a')
            .should('have.attr', 'href', 'https://github.com/' + profile.username)
            .and('have.attr', 'target', '_blank')
    })
})