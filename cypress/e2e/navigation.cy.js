describe('Website Navigation', () => {
    it('should open all main pages', () => {
        cy.visit('http://localhost:3000/en');

        cy.visit('http://localhost:3000/en/trips');
        cy.contains('Syunik Trips').should('be.visible');

        cy.visit('http://localhost:3000/en/city');
        cy.contains('Syunik Cities').should('be.visible');

        cy.visit('http://localhost:3000/en/history');
        cy.contains('History').should('be.visible');

        cy.visit('http://localhost:3000/en/product');
        cy.contains('Spirit of Mount Khustup').should('be.visible');

        cy.visit('http://localhost:3000/en/contact');
        cy.contains('Contact Us').should('be.visible');
    });
});