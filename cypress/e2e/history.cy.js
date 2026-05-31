describe('History Page - Syunik Dreams', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/en/history');
    });

    describe('Hero Section & Navigation', () => {
        it('should display the main hero title and subtitle', () => {
            cy.get('h1').contains('HISTORY OF').should('be.visible');
            cy.contains('A heroic path coming from the depths of centuries').should('be.visible');
        });

        it('should have functional navigation cards in the "Discover" section', () => {
            const cards = ['History of Syunik', 'Trips & Adventures', 'Cities of Syunik', 'Spirit of Khustup', 'Contact Us'];

            cards.forEach((cardTitle) => {
                cy.contains('div, a', cardTitle).should('be.visible');
            });
        });
    });

    describe('Content Sections', () => {
        it('should render all major historical sections with images', () => {
            const sections = ['Kingdom of Syunik', 'Liberation Struggle', "Syunik's Heroic Battle"];

            sections.forEach((section) => {
                cy.contains(section).should('be.visible');
            });
        });

        it('should verify the blockquote in the Heroic Battle section', () => {
            cy.contains('Syunik is our backbone').should('be.visible');
        });
    });

    describe('Cultural Heritage Section', () => {
        it('should display the heritage cards (Tatev, Vahanavank, Karahunj)', () => {
            cy.contains('Heritage').scrollIntoView();

            const sites = ['Tatev Monastery', 'Vahanavank', 'Zorats Karer'];
            sites.forEach((site) => {
                cy.contains(site).should('be.visible');
            });
        });
    });
});