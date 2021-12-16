describe('User App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    // helpers to grab elements
    const nameInput = () => cy.get('input[name=first_name');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput = () => cy.get('input[name=password]');
    const tosInput = () => cy.get('input[type="checkbox"]');
    const submitButton = () => cy.get('button[id="submitBtn"]');

    it('proper elements are showing', () => {
        nameInput().should('exist');
        emailInput().should('exist');
        passwordInput().should('exist');
        tosInput().should('exist');
        submitButton().should('exist');
    })

    describe('Visit the site; check for disabled submit button', () => {
        it('can navigate to the site', () => {
            cy.url().should('include', 'localhost');
        })

        it('submit button starts out disabled', () => {
            submitButton.apply().should('be.disabled');
        })
    })

    describe('Check text inputs (Name, Email, Password)', () => {
        it('can type in the inputs', () => {
            nameInput()
                .should('have.value', '')
                .type('test')
                .should('have.value', 'test');
            emailInput()
                .should('have.value', '')
                .type('test@email.com')
                .should('have.value', 'test@email.com');
            passwordInput()
                .should('have.value', '')
                .type('testpassword')
                .should('have.value', 'testpassword');
        })
    })

    describe('Check terms of service functionality', () => {
        it('can check terms of service checkbox', () => {
            tosInput().should('not.be.checked');
            tosInput().check();
            tosInput().should('be.checked');
            // reset back to baseline
            tosInput().uncheck();
            tosInput().should('not.be.checked');
        })
    })
})

