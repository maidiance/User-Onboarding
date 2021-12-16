describe('User App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    // helpers to grab elements
    const nameInput = () => cy.get('input[name=first_name');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput = () => cy.get('input[name=password]');
    const termsOfServiceInput = () => cy.get('input[type="checkbox"]');
    const submitButton = () => cy.get('button[id="submitBtn"]');

    it('proper elements are showing', () => {
        nameInput().should('exist');
        emailInput().should('exist');
        passwordInput().should('exist');
        termsOfServiceInput().should('exist');
        submitButton().should('exist');
    })

    describe('Visit the site with disabled submit button', () => {
        it('can navigate to the site', () => {
            cy.url().should('include', 'localhost');
        })

        it('submit button starts out disabled', () => {
            submitButton.apply().should('be.disabled');
        })
    })

})

