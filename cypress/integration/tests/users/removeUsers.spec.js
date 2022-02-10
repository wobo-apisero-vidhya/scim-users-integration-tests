/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody } from "../../../fixtures/request/user";

let userId = 0;

before('fetch the newly created test user', () => {
  cy.api({
    method: "POST",
    url: routes.POST,
    auth: auth,
    body: createRequestBody,
  }).then((response) => {
    userId = response.body.id
  });
});

describe('DELETE :: Delete User', () => {
  it('Deletes a user successfully', () => {   
    cy.api({
      method: 'DELETE', 
      url: routes.DELETE + userId,
      auth: auth,
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.null;
      expect(res.body.id).to.equal(userId);
    });
  });


  it('Delete non existing user', () => {   
    cy.api({
      method: 'DELETE', 
      url: routes.DELETE_INVALID_ID,
      auth: auth,
    }).then((res) => {
      expect(res.status).to.equal(200);
    });
  });

  it('DELETE with invalid token', () => {
    cy.api({
      method: 'DELETE',
      url: routes.DELETE + userId,
      //auth: auth,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.exist;
    });
  });

});
