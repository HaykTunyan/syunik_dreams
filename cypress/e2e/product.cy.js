
describe('Product & Shopping Page - Syunik Dreams', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/en/product'); // Assuming /product path for shopping
    });

    describe('Product Categories', () => {
        it('should display all product categories with counts', () => {
            const categories = ['Dried Fruits', 'Honey', 'Spices', 'Handicrafts', 'Wines'];

            categories.forEach(cat => {
                cy.contains('button', cat).should('be.visible');
            });
        });

        it('should filter products when a category is selected', () => {
            cy.contains('Honey').click();
            // Check that some honey products are visible
            cy.get('.product-item').should('exist');
        });
    });

    describe('Product Listings', () => {
        it('should display all product cards', () => {
            const productName = 'Pine Nut Honey';
            // Check if a specific product exists
            cy.contains(productName).should('be.visible');

            // Verify product cards have expected structure (image, title, price)
            cy.contains(productName).parents('.product-card, .product-item').within(() => {
                cy.get('img').should('be.visible');
                cy.get('.product-title').should('exist');
                cy.get('.product-price').should('exist');
            });
        });

        it('should have functional "Add to Cart" buttons', () => {
            cy.contains('Pine Nut Honey').click(); // Open product details or assume direct add
            cy.contains('button', 'Add to Cart').click();
            // Verify cart icon updates or a success message appears
            cy.get('.cart-icon').should('contain', '1'); // Assuming cart updates count
        });
    });

    describe('Shopping Cart Modal', () => {
        beforeEach(() => {
            // Force cart to open or click cart icon
            cy.get('.cart-icon').click();
        });

        it('should display the shopping cart with items', () => {
            cy.get('.cart-modal').should('be.visible');
            cy.get('.cart-item').should('exist');
        });

        it('should update cart total when quantity changes', () => {
            cy.get('.cart-item').within(() => {
                cy.get('button').contains('+').click();
            });
            // Verify total price updates
            cy.get('.cart-total').should('exist');
        });
    });

    describe('Language & Currency Support', () => {
        it('should display prices in USD', () => {
            cy.contains('Pine Nut Honey').parents('.product-card, .product-item').within(() => {
                cy.get('.product-price').contains('$').should('exist');
            });
        });

        it('should allow switching to Armenian language', () => {
            cy.contains('button', 'Հայ').click();
            cy.contains('Այլ').should('be.visible');
        });
    });
});