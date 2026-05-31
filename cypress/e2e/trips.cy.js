describe('Trips & Adventures Page - Syunik Dreams', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/en/trips');
    });

    describe('Interactive Trip Planner', () => {
        it('should display the map and city selection sidebar', () => {
            cy.get('.leaflet-container').should('be.visible');
            cy.contains('Trip Information').scrollIntoView().should('be.visible');
        });

        it('should allow selecting a city and verify the "Book Now" button state', () => {
            // Click Kapan button in sidebar
            cy.get('button').contains('Kapan').click();

            // The "Book Now" button should now be enabled and contain "Book Now"
            cy.contains('button', 'Book Now').should('not.be.disabled');
        });

        it('should show map markers for the cities', () => {
            // Check for the presence of map pins/markers
            cy.get('.leaflet-marker-icon').should('have.length.at.least', 5);
        });
    });

    describe('Historical Trip Places', () => {
        it('should display specific historical landmarks', () => {
            const landmarks = ['Tatev Monastery', 'Zorats Karer', 'Meghri Mother Church'];

            landmarks.forEach((name) => {
                cy.contains(name).should('be.visible');
            });
        });
    });

    describe('Most Visited Attractions Grid', () => {
        it('should render the attraction cards with correct titles', () => {
            const attractions = [
                'Tatev Monastery',
                'Karahunj (Zorats Karer)',
                'Khndzoresk Swinging Bridge',
                'Shake Waterfall',
                'Mount Khustup',
                'Vorotnavank Monastery'
            ];

            attractions.forEach((title) => {
                cy.contains('h3', title).should('be.visible');
            });
        });
    });

    describe('Footer Navigation', () => {
        it('should have functional links in the site footer', () => {
            cy.get('footer').within(() => {
                cy.contains('Tourism').should('have.attr', 'href');
                cy.contains('Privacy Policy').should('have.attr', 'href');
            });
        });
    });
});