/**
 * Iframe é um elemento HTML que permite incorporar outro documento HTML dentro do documento atual.
 * Em testes automatizados, interagir com iframes pode ser desafiador, pois eles criam um contexto separado do documento principal.
 * Cypress oferece maneiras de acessar e interagir com o conteúdo dentro de um iframe.
 */

describe('iFrame', () => {
    it('Deve poder tocar o video de exemplo', () => {
        cy.login()
        cy.contains('Video').click()

        //think time
        cy.wait(3000)

        cy.get('iframe[title="Video Player"]')
            .should('exist')
            /**
             * Função do cypress para obter propriedades de elementos, storage, janela, cookie e iframe e objetos para testes de api 
             * 0 = Posição do array do iframe
             * contentDocument = Propriedade que permite acessar o documento dentro do iframe
             * body = Corpo do documento HTML dentro do iframe
             */
            .its('0.contentDocument.body')
            /**
             * then = callback do cypress que permite manipular o elemento retornado pela função anterior
             * cy.wrap = Recuso do cpress que possibilita pegar o valor de um objeto, array ou elemento e "embrulhá-lo" em um objeto Cypress para que possamos continuar a usar os comandos do Cypress nele.
             */
            .then(cy.wrap)
            /**
             * as = Cria um alias (apelido) para o elemento selecionado, permitindo referenciá-lo posteriormente no teste usando o nome do alias.
             */
            .as('iFramePlayer')

        /**
         * Agora podemos interagir com os elementos dentro do iframe usando o alias criado
         */
        cy.get('@iFramePlayer')
            .find('.play-button')
            .click()

        cy.get('@iFramePlayer')
            .find('.pause-button')
            .should('be.visible')
    })
})