describe('Gerenciamento de perfis do GitHub', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', 'Perfis do GitHub')
    })

    it('Deve poder cadastrar um novo perfil do GitHub', () => {
        //Simular uma massa de teste já existente
        cy.get('#name').type('Diego Guiomar')
        cy.get('#username').type('diegoguiomarqa')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        //Massa de teste que estamos testando agora
        cy.get('#name').type('Diego Guiomar')
        cy.get('#username').type('diegoguiomar')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        //Teste utilizando regex para garantir que o username exato seja localizado junto do within e eq 
        //cy.contains('table tbody td', /^diegoguiomar$/)
        //     .should('be.visible')
        //     .parent('tr')
        //     .within(() => { //Limita o escopo dos comendos do Cypress para apenas o elemento atual (nesse caso, o <tr>)
        //         //O eq(index) seleciona um elemento pelo índice dentro de uma lista. Existe uma forma mais resiliente se existir header na tabela
        //         cy.get('td').eq(0).should('have.text', 'Diego Guiomar').and('be.visible') // name
        //         cy.get('td').eq(2).should('have.text', 'QA').and('be.visible')            // profile
        //     })

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

        //Simulando uma massa de teste já existente
        cy.get('#name').type('Diego Guiomar')
        cy.get('#username').type('diegoguiomarqa')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        //Cadastrando um novo profile
        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        //Removendo o perfil já existente, mantendo apenas o que foi cadastrado recentemente
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

        //Simulando uma massa de teste já existente
        cy.get('#name').type('Diego Guiomar')
        cy.get('#username').type('diegoguiomarqa')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        //Cadastrando um novo profile
        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        //Removendo o perfil já existente, mantendo apenas o que foi cadastrado recentemente
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