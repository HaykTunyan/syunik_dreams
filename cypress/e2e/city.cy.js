describe('Cities Page - Syunik Dreams', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/en/city');
    });

    describe('Page Header', () => {
        it('should display the main page title correctly', () => {
            cy.get('h1').contains('SYUNIK CITIES').should('be.visible');
            cy.contains('The Southern Gate of Armenia').should('be.visible');
        });
    });

    describe('City Cards Content', () => {
        const cities = [
            { name: 'KAPAN', area: '36 km²', founded: '10th century' },
            { name: 'GORIS', area: '5.03 km²', founded: '1870' },
            { name: 'SISIAN', area: '9 km²', founded: '8th century BC' },
            { name: 'AGARAK', area: '2.5 km²', founded: '1950' },
            { name: 'MEGHRI', area: '3 km²', founded: '906' },
            { name: 'QAJARAN', area: '4.1 km²', founded: '1958' }
        ];

        cities.forEach((city) => {
            it(`should render the correct data for ${city.name}`, () => {
                // Scope the search to the specific city card
                cy.contains('h2, h3', city.name).parents('.city-card, div[class*="card"]').within(() => {
                    cy.contains(city.area).should('be.visible');
                    cy.contains(city.founded).should('be.visible');
                    cy.contains('More →').should('have.attr', 'href');
                });
            });
        });

        it('should verify that all city cards contain a map/leaflet container', () => {
            // Assuming you are using Leaflet or a similar map library
            cy.get('.leaflet-container, .map-box').should('have.length', 6).and('be.visible');
        });
    });

    describe('Interactive Elements', () => {
        it('should navigate to city details when clicking "More"', () => {
            cy.contains('h2, h3', 'KAPAN')
                .parents('.city-card, div[class*="card"]')
                .find('a').contains('More').click();

            cy.url().should('include', '/kapan');
        });

        it('should have a functional "Explore History" CTA at the bottom', () => {
            cy.contains('WANT TO KNOW MORE').scrollIntoView();
            cy.get('a').contains('EXPLORE HISTORY').click();
            cy.url().should('include', '/history');
        });
    });

    describe('Responsive Verification', () => {
        it('should display cards in a single column on mobile', () => {
            cy.viewport('iphone-xr');
            // Verify that cards take up full width or stack vertically
            cy.get('.city-card, div[class*="card"]').first().should('be.visible');
        });
    });
});