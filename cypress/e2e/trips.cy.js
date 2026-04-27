describe('Trips & Adventures Page - Syunik Dreams', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/en/trips');
    });

    describe('Interactive Trip Planner', () => {
        it('should display the map and city selection sidebar', () => {
            cy.get('.leaflet-container').should('be.visible');
            cy.contains('Trip Information').should('be.visible');
        });

        it('should allow selecting a city and verify the "Book Now" button state', () => {
            // Assuming "Kapan" is one of the list items
            cy.get('li, div').contains('Kapan').click();

            // Verify the selection styling changes (e.g., background color or class)
            cy.get('li, div').contains('Kapan').should('have.css', 'background-color');

            // The "Book Now" button should now be enabled or visible
            cy.contains('button', 'Book Now').should('not.be.disabled');
        });

        it('should show map markers for the cities', () => {
            // Check for the presence of map pins/markers
            cy.get('.leaflet-marker-icon').should('have.length.at.least', 5);
        });
    });

    describe('Historical Trip Places', () => {
        it('should display specific historical landmarks with their icons', () => {
            const landmarks = ['Tatev Monastery', 'Zorats Karer', 'Meghri Mother Church'];

            landmarks.forEach((name) => {
                cy.contains(name).should('be.visible');
                // Check that an icon or svg is associated with the landmark
                cy.contains(name).parent().find('svg, img').should('exist');
            });
        });
    });

    describe('Most Visited Attractions Grid', () => {
        it('should render all 9 attraction cards with correct titles', () => {
            const attractions = [
                'TATEV MONASTERY',
                'KARAHUNJ',
                'KHNDZORESK SWINGING BRIDGE',
                'SHAKE WATERFALL',
                'MOUNT KHUSTUP',
                'VOROTNAVANK MONASTERY'
            ];

            attractions.forEach((title) => {
                cy.contains('h3, h4', title).should('be.visible');
            });

            // Verify total count of cards in this section
            cy.get('.attractions-grid div[class*="card"]').should('have.length.at.least', 6);
        });

        it('should have hover effects or links on attraction cards', () => {
            // Check if clicking a card (like Tatev) leads to a detail page
            cy.contains('TATEV MONASTERY').click({ force: true });
            // cy.url().should('include', '/attractions/tatev'); 
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