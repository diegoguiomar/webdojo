/**
 * Os testes abaixo foram feitos considerando a inexistência ou 
 * inutilização dos id's nas divs, labels, etc.
 * before(): Executa uma única vez antes de todos os testes
 * beforeEach(): Executa antes de cada teste
 * afterEach(): Executa depois de cada teste
 * after(): Executa uma única vez depois de todos os testes
 */
Cypress.Commands.add('fillConsultancyForm', (form) => {
    cy.get('input[placeholder="Digite seu nome completo"]')
        .type(form.name)

    cy.get('input[placeholder="Digite seu email"]')
        .type(form.email)

    cy.get('input[placeholder="(00) 00000-0000"]')
        .type(form.phone)
    //.should('have.value', '(21) 97909-0561')

    /**
     * Testando um campo select
     * Buscar pela label
     * Encontrar o select dentro da label
     * Selecionar a opção desejada no teste
     */
    cy.contains('Tipo de Consultoria')
        .parents()
        .find('select')
        .select(form.consultancyType)

    /**
     * Lidando com radio button para determinar o tipo de pessoa
     * Buscar pelo nome da label
     * Encontrar o input da label
     * Determinar se será selecionado ou não
     * Exibir resultado
     */
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
        // .should('have.value', '461.159.630-36')
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
        // .should('have.value', '461.159.630-36')
    }


    /**
     * Interagindo com campo de CPF
     * Quando o placeholder não for ideal para utilizar na automação, utilizar a label
     * Buscar pelo input
     * Inserir o documento sem pontuação (geralmente como é feito no backend)
     * Exibir resultado utilizando a máscara determinada pelo front
     */
    // cy.contains('label', 'CPF')
    //     .parent()
    //     .find('input')
    //     .type(fillConsultancyForm.document)
    // // .should('have.value', '461.159.630-36')

    /**
     * Lidando com check box para selecionar todas as opções
     * Ideal é criar uma variável que recebe um array com todas as opções
     * Após isso, utilizar o forEach passando um parâmetro para representar as opções
     */

    form.discoveryChannels.forEach((channel) => {
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
    })

    /**
    * Interagindo com upload de arquivos,
    * Quando o elemento for escondido pelo front devemos utilizar o force:true dentro do selectFile
     */
    cy.get('input[type="file"]')
        .selectFile(form.file, { force: true })

    cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
        .type(form.description)

    /**
     * Interagindo com array de tags e simulando teclado físico
     * Exemplo: Para utilizar a tecla "Enter" devemos passar .type({enter})
     */

    form.techs.forEach((tech) => {
        cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
            .type(tech)
            .type('{enter}')

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', tech)
            .should('be.visible')
    })

    // cy.contains('label', 'Tecnologias')
    //     .parent()
    //     .contains('span', 'WebDriverIO')
    //     .find('button')
    //     .click()

    /**
     * Lidando com check box de termos de uso
     * Buscar pela label
     * Encontrar o input dentro da label
     * Selecionar o check box
     */
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