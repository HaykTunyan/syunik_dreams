describe('History Page - Syunik Dreams', () => {
    beforeEach(() => {
        cy.visit('https://syunik-dreams.vercel.app/en/history');
    });

    describe('Hero Section & Navigation', () => {
        it('should display the main hero title and subtitle', () => {
            cy.get('h1').contains('HISTORY OF SYUNIK').should('be.visible');
            cy.contains('A heroic path coming from the depths of centuries').should('be.visible');
        });

        it('should have functional navigation cards in the "Discover" section', () => {
            const cards = ['History of Syunik', 'Trips & Adventures', 'Cities of Syunik', 'Spirit of Khustup', 'Contact Us'];

            cards.forEach((cardTitle) => {
                cy.contains('div', cardTitle)
                    .should('be.visible')
                    .find('a', { timeout: 2000 })
                    .should('have.attr', 'href');
            });
        });
    });

    describe('Content Sections', () => {
        it('should render all major historical sections with images', () => {
            const sections = ['Kingdom of Syunik', 'Liberation Struggle', "Syunik's Heroic Battle"];

            sections.forEach((section) => {
                // Check text visibility
                cy.contains('h2, h3', section).should('be.visible');

                // Check that each section has an associated image
                cy.contains('h2, h3', section)
                    .parents('section, div[class*="container"]') // Adjust based on your DOM structure
                    .find('img')
                    .should('be.visible')
                    .and(($img) => {
                        // Verify image actually loaded
                        expect($img[0].naturalWidth).to.be.greaterThan(0);
                    });
            });
        });

        it('should verify the blockquote in the Heroic Battle section', () => {
            cy.get('blockquote, .quote-text') // Update with your actual quote class
                .should('include.text', 'Syunik is our backbone');
        });
    });

    describe('Cultural Heritage Section', () => {
        it('should display the heritage cards (Tatev, Vorotnavank, Karahunj)', () => {
            cy.contains('Cultural Heritage').scrollIntoView();

            const sites = ['Tatev Monastery', 'Vorotnavank', 'Zorats Karer'];
            sites.forEach((site) => {
                cy.contains(site).should('be.visible');
            });
        });
    });

    describe('Accessibility & UI', () => {
        it('should have high contrast and readable text on dark background', () => {
            // Basic check for text color property if needed
            cy.get('p').first().should('have.css', 'color', 'rgb(255, 255, 255)');
        });

        it('should navigate to the Contact page from the Discover section', () => {
            cy.contains('Contact Us').click();
            cy.url().should('include', '/contact');
        });
    });
});