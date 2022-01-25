/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody } from "../../../fixtures/request/user";

describe("POST :: create user", () => {
  it("should add a new user successfully", () => {
    cy.api({
      method: "POST",
      url: routes.POST,
      auth: auth,
      body: createRequestBody,
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.id).to.equal("55");
    });
  });
});
