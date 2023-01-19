/// <reference types="cypress" />

context('Login page test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    // cy.viewport('iphone-x');
    cy.viewport(1366, 768);
  });

  it('test validation of inputs', () => {
    cy.get('#login-email').type('cristian@testcom').blur();
    cy.get('.email-error-span').should('be.visible');

    cy.get('#login-password').type('12').blur();
    cy.get('.password-error-span').should('be.visible');

    cy.get('button').should('be.disabled');
    cy.wait(1000);
  });

  it('test login of an existing user', () => {
    cy.get('#login-email')
      .type('cristian@test.com')
      .should('have.value', 'cristian@test.com');

    cy.get('#login-password')
      .type('12345')
      .should('have.value', '12345')
      .blur();

    cy.get('button').click();
    cy.location('pathname').should('include', 'home');
  });
});
