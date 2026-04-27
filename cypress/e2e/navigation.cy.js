describe('Website Navigation', () => {
    it('should open all main pages', () => {
        cy.visit('/')

        cy.visit('/trips')
        cy.contains('TRIPS')

        cy.visit('/city')
        cy.contains('CITY')

        cy.visit('/history')
        cy.contains('HISTORY')

        cy.visit('/product')
        cy.contains('PRODUCT')

        cy.visit('/contacts')
        cy.contains('CONTACTS')
    })
})