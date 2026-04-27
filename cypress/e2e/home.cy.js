describe('Homepage - Syunik Dreams', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    describe('Navbar and Language Navigation', () => {
        it('should display the correct navigation links', () => {
            const navLinks = ['TRIPS', 'CITY', 'HISTORY', 'PRODUCT', 'CONTACTS'];

            navLinks.forEach(link => {
                cy.contains('a, button', link).should('be.visible');
            });
        });

        it('should switch to Armenian language', () => {
            cy.get('button').first().realClick(); // Adjust selector if the first button is the language switch
            // Wait for page to reload or content to update
            // Check for Armenian text
            cy.contains('Հայ').should('be.visible');
        });
    });

    describe('Hero Section', () => {
        it('should have a compelling title and subtitle', () => {
            cy.contains('Live Your Armenian Dream in Syunik').should('be.visible');
            cy.contains('Discover the heart of Armenia with Syunik Dreams, your gateway to the country').should('be.visible');
        });

        it('should have functional CTA buttons', () => {
            cy.contains('button', 'Book Now').should('be.visible').click();
            // cy.url().should('include', '/trips');
        });
    });

    describe('Most Visited Attractions Section', () => {
        it('should display the correct number of attraction cards', () => {
            cy.get('.attractions-grid').should('be.visible');
            // Adjust count based on the actual number visible without scrolling
            cy.get('.attractions-grid div[class*="card"]').should('have.length.at.least', 6);
        });

        it('should allow navigation to Tatev Monastery details', () => {
            cy.contains('TATEV MONASTERY').click({ force: true });
            // Verify URL change if applicable
            // cy.url().should('include', '/attractions/tatev');
        });
    });

    describe('Footer', () => {
        it('should display quick links and company info', () => {
            cy.get('footer').should('be.visible');
            cy.contains('QUICK LINKS').should('be.visible');
            cy.contains('COMPANY').should('be.visible');
        });

        it('should have social media links', () => {
            cy.get('footer a[href*="facebook"]').should('have.attr', 'href');
            cy.get('footer a[href*="instagram"]').should('have.attr', 'href');
        });
    });
});