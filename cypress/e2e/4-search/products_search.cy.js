/// <reference types="cypress" />

describe("Products search", () => {
  beforeEach(() => {
    const url = "http://localhost";
    const portRouter = "3000";
    const email = "testuser@test.com";
    const password = "TestPassword123";

    cy.visit(`${url}:${portRouter}`);

    cy.get("[data-cy='email']").type(email);
    cy.get("[data-cy='password']").type(password);

    cy.get("[data-cy='submit']").click();

    cy.get('[data-cy="searchInput"]').as("searchInput");
  });

  it("Finds exact products", () => {
    cy.get("@searchInput").type("AMD");

    cy.get('[data-cy="product"]').get(".card__hdl").contains("AMD Ryzon 9700");
  });

  it("Checks if product is not included", () => {
    cy.get("@searchInput").type("Windows");

    cy.get('[data-cy="product"]')
      .get(".card__hdl")
      .then((headers) => {
        [...headers].forEach((header) => {
          expect(header.innerHTML).to.not.contain("AMD Ryzon 9700");
        });
      });
  });

  it("Autocomplete should be visible", () => {
    cy.get("@searchInput").type("Windows");

    cy.get('[data-cy="autocomplete"]').should("exist");
  });

  it("Autocomplete should not be visible", () => {
    cy.get('[data-cy="autocomplete"]').should("not.exist");
  });

  it("Autocomplete results should contain phrase from input", function () {
    cy.get("@searchInput").type("Windows");

    cy.get('[data-cy="autocomplete-item"] .autocomplete__highlight').then(
      (items) => {
        [...items].forEach((item) => {
          expect(item.innerText).to.contains("Windows");
        });
      }
    );
  });

  it("Autocomplete should be in-case sensitive", function () {
    cy.get("@searchInput").type("WiN");

    cy.get('[data-cy="autocomplete-item"] .autocomplete__highlight').then(
      (items) => {
        [...items].forEach((item) => {
          expect(item.innerText).to.contains("Win");
        });
      }
    );
  });

  it("Clicking on the tooltip completes the input", function () {
    cy.get("@searchInput").type("Win");

    cy.get('[data-cy="autocomplete-item"]').first().click();

    cy.get("@searchInput").should("have.value", "Windows 10");
  });

  it("Too long input phrase should not return any search results", function () {
    cy.get("@searchInput").type("Windows 10 pro");

    cy.get('[data-cy="products"]').should("not.exist");
  });
});
