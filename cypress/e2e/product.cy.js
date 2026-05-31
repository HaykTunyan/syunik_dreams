describe('Product & Shopping Page - Syunik Dreams', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/en/product');
    });

    describe('Product Details & Size Selection', () => {
        it('should display product details correctly', () => {
            // Check for category badge or "madeBy"
            cy.contains('Designed and made by the owner in Syunik').should('be.visible');
            // Check title
            cy.contains('h1', 'Spirit of Mount Khustup').should('be.visible');
            // Check price
            cy.contains('12,000 ֏').should('be.visible');
        });

        it('should require selecting a size before enabling the order button', () => {
            // The "Order Now" button should be disabled initially since no size is selected
            cy.contains('button', 'Order Now').should('be.disabled');

            // Select a size, e.g., 'M'
            cy.contains('button', 'M').click();

            // The "Order Now" button should now be enabled
            cy.contains('button', 'Order Now').should('not.be.disabled');
        });
    });

    describe('Order Modal Process', () => {
        it('should open the success modal when ordering after size selection', () => {
            // Select size 'L'
            cy.contains('button', 'L').click();

            // Click the Order Now button
            cy.contains('button', 'Order Now').click();

            // Success modal should be visible
            cy.contains('Order Placed Successfully!').should('be.visible');
            cy.contains('item added to your selection').should('be.visible');

            // Click close button on success modal (translated as "Great!")
            cy.contains('button', 'Great!').click();

            // Success modal should close
            cy.contains('Order Placed Successfully!').should('not.exist');
        });
    });

    describe('Language Support', () => {
        it('should support switching to Armenian language', () => {
            // Click language switcher dropdown from header
            cy.get('button').contains('en', { matchCase: false }).click();
            // Select Armenian language
            cy.contains('button', 'Հայերեն').click();

            // URL should update to /hy/product
            cy.url().should('include', '/hy/product');

            // The content should now show Armenian text
            cy.contains('h1', 'Խուստուփ լեռան ոգին').should('be.visible');
            cy.contains('Պատվիրել Հիմա').should('be.visible');
        });
    });
});