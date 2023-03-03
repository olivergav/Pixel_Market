/// <reference types="cypress" />

describe("Product details view", function () {
  beforeEach(async function () {
    this.allFixtures = await cy.fixture("allFixtures");
  });

  it("Product should have image", function () {
    cy.visit("/products/2");
    cy.login(this.allFixtures.user);
    cy.get('[data-cy="product-details-image"]').should("exist");
  });
});
