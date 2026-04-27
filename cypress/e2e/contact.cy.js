describe('Contact Us Page - Syunik Dreams', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/en/contact');
    });

    describe('Contact Form Functionality', () => {
        it('should show validation errors when submitting an empty form', () => {
            cy.contains('button', 'Send Message').click();

            cy.get('input:invalid').should('have.length.at.least', 1);
        });

        it('should show an error for an invalid email format', () => {
            cy.get('input[placeholder="John Doe"]').type('Test User');
            cy.get('input[placeholder="john@example.com"]').type('invalid-email-format');
            cy.get('textarea').type('Testing message content.');
            cy.contains('button', 'Send Message').click();

            // Check if the browser's native validation or your custom error is triggered
            cy.get('input[type="email"]:invalid').should('exist');
        });

        it('should successfully submit the form (Mocked)', () => {
            // 1. Intercept the POST request to your backend/form service
            cy.intercept('POST', '**/api/contact', {
                statusCode: 200,
                body: { message: 'Success' },
            }).as('submitForm');

            // 2. Fill the form
            cy.get('input[placeholder="John Doe"]').type('Suren Papyan');
            cy.get('input[placeholder="john@example.com"]').type('suren@example.com');
            cy.get('textarea').type('I would like to book a tour to Tatev Monastery.');

            // 3. Submit
            cy.contains('button', 'Send Message').click();

            // 4. Assert the network call was made and UI responded
            cy.wait('@submitForm');
            // Assert that a success message appears or the form clears
            // cy.contains('Thank you').should('be.visible'); 
        });
    });

    describe('Sidebar & Social Info', () => {
        it('should display the correct contact information', () => {
            cy.get('aside, .get-in-touch-card').within(() => {
                cy.contains('Syunik Region, Armenia').should('be.visible');
                cy.contains('syunikdreams@gmail.com').should('be.visible');
                cy.contains('+374 99 990797').should('be.visible');
            });
        });

        it('should have functional social media links', () => {
            const platforms = ['facebook', 'instagram', 'pinterest', 'twitter'];

            platforms.forEach((platform) => {
                cy.get(`a[href*="${platform}"]`)
                    .should('be.visible')
                    .and('have.attr', 'target', '_blank'); // Good UX for social links
            });
        });
    });

    describe('Responsive Design', () => {
        it('should be layout-compliant on mobile devices', () => {
            cy.viewport('iphone-xr');
            // Ensure the "Get in Touch" section stacks or handles overflow
            cy.contains('Get in Touch').should('be.visible');
            cy.get('button').contains('Send Message').should('be.visible');
        });
    });
});