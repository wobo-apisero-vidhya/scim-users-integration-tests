/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, invalidCreateRequestBody } from "../../../fixtures/request/user";

describe("POST :: create user", () => {
  
  it("should add a new user successfully", () => {
    cy.api({
      method: "POST",
      url: routes.POST,
      auth: auth,
      body: createRequestBody,
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.userName).to.equal("john.doe@workboard.com");
    });
  });

  it("Post with invalid request body", () => {
    cy.api({
      method: "POST",
      url: routes.POST,
      auth: auth,
      failOnStatusCode: false,
      body: invalidCreateRequestBody,
    }).then((response) => {
      expect(response.status).to.equal(400);
    });
  });

  it('POST with invalid token', () => {
    cy.api({
      method: 'POST',
      url: routes.POST,
      //auth: auth,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.exist;
    });
  });

  it("POST with already existing user", () => {
    cy.api({
      method: "POST",
      url: routes.POST,
      auth: auth,
      body: createRequestBody,
    }).then((response) => {
      expect(response.status).to.equal(201);
    });
  });
  
});
