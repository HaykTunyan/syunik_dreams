describe('Homepage - Syunik Dreams', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/en');
    });

    describe('Navbar and Language Navigation', () => {
        it('should display the correct navigation links', () => {
            const navLinks = ['History', 'Tourism'];

            navLinks.forEach(link => {
                cy.contains('a', link).should('be.visible');
            });
        });

        it('should switch to Armenian language', () => {
            // Click the language dropdown button
            cy.get('button').contains('en', { matchCase: false }).click();
            // Click "Հայերեն" option
            cy.contains('button', 'Հայերեն').click();
            // The language button should now display "hy"
            cy.get('button').contains('hy', { matchCase: false }).should('be.visible');
        });
    });

    describe('Hero Section', () => {
        it('should have a compelling title and subtitle', () => {
            cy.contains('h1', 'SYUNIK').should('be.visible');
            cy.contains('The world of eternal mountains and unconquerable spirit').should('be.visible');
        });
    });

    describe('Card Navigation Section', () => {
        it('should display the navigation cards', () => {
            cy.contains('History of Syunik').should('be.visible');
            cy.contains('Trips & Adventures').should('be.visible');
            cy.contains('Cities of Syunik').should('be.visible');
            cy.contains('Spirit of Khustup').should('be.visible');
            cy.contains('Contact Us').should('be.visible');
        });

        it('should allow navigation to History page', () => {
            cy.contains('History of Syunik').click({ force: true });
            cy.url().should('include', '/history');
        });
    });

    describe('Footer', () => {
        it('should display quick links headings', () => {
            cy.get('footer').should('be.visible');
            cy.contains('Explore').should('be.visible');
            cy.contains('Support').should('be.visible');
        });
    });
});