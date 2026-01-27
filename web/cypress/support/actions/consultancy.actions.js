Cypress.Commands.add('fillConsultancyForm', (form) => {
    cy.get('input[placeholder="Digite seu nome completo"]')
        .type(form.name)

    cy.get('input[placeholder="Digite seu email"]')
        .type(form.email)

    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.phone)
        .invoke('val')
        .then(maskPhone => {
            expect(maskPhone).to.match(/^\(\d{2}\) \d{5}-\d{4}$/)
            const phone = maskPhone.replace(/\D/g, '')
            expect(phone).to.eq(form.phone)
        })

    cy.contains('Tipo de Consultoria')
        .parents()
        .find('select')
        .select(form.consultancyType)

    if (form.personType === 'cpf') {
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type(form.document)
            .invoke('val')
            .then(maskCpf => {
                expect(maskCpf).to.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
                const cpf = maskCpf.replace(/\D/g, '')
                expect(cpf).to.eq(form.document)
            })
    }

    if (form.personType === 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .click()
            .should('be.checked')

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CNPJ')
            .parent()
            .find('input')
            .type(form.document)
            .invoke('val')
            .then(maskCnpj => {
                expect(maskCnpj).to.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
                const cnpj = maskCnpj.replace(/\D/g, '')
                expect(cnpj).to.eq(form.document)
            })
    }

    form.discoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
    })

    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true })

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)

    form.techs.forEach((tech) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')
    })

    if (form.terms === true) {
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
    }
})

Cypress.Commands.add('submitConsultancyForm', () => {
    cy.contains('button', 'Enviar formulário')
        .click()
})

Cypress.Commands.add('validateConsultancyModal', () => {
    cy.get('.modal', { timeout: 7000 })
        .should('be.visible')
        .find('.modal-content')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
})