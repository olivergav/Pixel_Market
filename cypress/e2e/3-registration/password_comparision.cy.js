/// <reference types="cypress" />

describe("Products filtering", () => {
  beforeEach(async function () {
    const url = "http://localhost";
    const portRouter = "3000";

    this.user = await cy.fixture("user");

    cy.visit(`${url}:${portRouter}/register`);

    cy.get("[data-cy='email']").type(this.user.email);

    cy.get("[data-cy='password']").type(this.user.password);
  });

  it("Should compare the passwords", function () {
    cy.get("[data-cy='repeatPassword']").type(this.user.wrongPassword);
    cy.get("[data-cy='validationRepeatPassword']").contains(
      "Passwords are not the same!"
    );
  });

  it("Should has the same passwords", function () {
    cy.get("[data-cy='repeatPassword']").type(this.user.password);
    cy.get("[data-cy='validationRepeatPassword']").contains(
      "Passwords are not the same!"
    );
  });
});
