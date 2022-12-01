describe('Render full shop list', () => {
	it('passes', () => {
		cy.visit('http://localhost:3000');
		cy.contains('button', 'View Shops').click();
		cy.get('ul').find('li').should('have.length', 5);
	});
});

describe('Go to correct shop detail page', () => {
	it('passes', () => {
		cy.visit('http://localhost:3000/shop');
		cy.get('ul').find('li').first().click();
		cy.url().should('to.include', 'Conjure');
	});
});

describe('Go to Conjure projects page', () => {
	it('passes', () => {
		cy.visit('http://localhost:3000/shop/Conjure');
		cy.contains('button', 'Projects').click();
		cy.get('ul').find('li').should('have.length', 8);
	});
});
