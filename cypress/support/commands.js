// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (user) => {
  cy.get('[data-cy="email"]').type(user.email);
  cy.get('[data-cy="password"]').type(user.password);

  cy.get('[data-cy="submit"]').click();
});

Cypress.Commands.add("register", (user) => {
  cy.get('[data-cy="email"]').type(user.email);
  cy.get('[data-cy="password"]').type(user.password);
  cy.get('[data-cy="repeatPassword"]').type(user.repeatPassword);

  cy.get('[data-cy="submit"]').click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
