describe('Cities Page - Syunik Dreams', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/en/city');
    });

    describe('Page Header', () => {
        it('should display the main page title correctly', () => {
            cy.get('h1').contains('Syunik Cities', { matchCase: false }).should('be.visible');
            cy.contains('The Southern Gate of Armenia').should('be.visible');
        });
    });

    describe('City Cards Content', () => {
        const cities = [
            { id: 'kapan', name: 'Kapan', area: '36 km²', founded: '10th century' },
            { id: 'goris', name: 'Goris', area: '5.03 km²', founded: '1870' },
            { id: 'sisian', name: 'Sisian', area: '9 km²', founded: '8th century BC' },
            { id: 'agarak', name: 'Agarak', area: '2.5 km²', founded: '1950' },
            { id: 'meghri', name: 'Meghri', area: '3 km²', founded: '906' },
            { id: 'qajaran', name: 'Qajaran', area: '4.1 km²', founded: '1958' }
        ];

        cities.forEach((city) => {
            it(`should render the correct data for ${city.name}`, () => {
                cy.contains('h2', city.name).parents('div[class*="rounded-3xl"]').within(() => {
                    cy.contains(city.area).should('be.visible');
                    cy.contains(city.founded).should('be.visible');
                    cy.contains('More').should('have.attr', 'href');
                });
            });
        });

        it('should verify that city maps are visible', () => {
            cy.get('.leaflet-container').should('have.length.at.least', 1).and('be.visible');
        });
    });

    describe('Interactive Elements', () => {
        it('should navigate to city details when clicking "More"', () => {
            cy.contains('h2', 'Kapan')
                .parents('div[class*="rounded-3xl"]')
                .find('a').contains('More').click();

            cy.url().should('include', '/city/kapan');
        });

        it('should have a functional "Explore History" CTA at the bottom', () => {
            cy.contains('Want to know more', { matchCase: false }).scrollIntoView();
            cy.get('a').contains('Explore History', { matchCase: false }).click();
            cy.url().should('include', '/history');
        });
    });
});