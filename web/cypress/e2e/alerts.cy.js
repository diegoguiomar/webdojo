describe('Validações de Alertas em JavaScrips', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar a mensagem de alerta', () => {
        cy.on('window:alert', (msg) => {
            expect(msg).to.eq('Olá QA, eu sou um Alert Box!')
        }) //É um listner que captura o alerta

        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um diálogo e validar a resposta positiva', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.eq('Aperte um botão!')
            return true // True simula o clique no botão OK
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.eq('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve cancelar um diálogo e validar a resposta negativa', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.eq('Aperte um botão!')
            return false // False simula o clique no botão Cancelar
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.eq('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve interagir com um prompt, inserir um texto e validar uma mensagem', () => {
        /**
         * window = Acessa a janela do navegador 
         * then(win) = Chama um callback passando o argumento win para ter acesso ao objeto para manipular a janela do navegador
         * stub = Cria um stub para simular o comportamento de uma função específica (no caso o prompt)
         * win = Janela que quer manipular
         * prompt = Função que quer simular
         * returns = Define o valor que será retornado quando o prompt for chamado
         */
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Diego Guiomar')
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.eq('Olá Diego Guiomar! Boas-vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt').click()
    })
})