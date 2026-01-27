describe('iFrame', () => {
    it('Deve poder tocar o video de exemplo', () => {
        cy.login()
        cy.contains('Video').click()

        cy.get('iframe[title="Video Player"]')
            .should('exist')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap)
            .as('iFramePlayer')

        cy.get('@iFramePlayer')
            .find('.play-button', {timeou: 3000})
            .click()

        cy.get('@iFramePlayer')
            .find('.pause-button')
            .should('be.visible')
    })
})