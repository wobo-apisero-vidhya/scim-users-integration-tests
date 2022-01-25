/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, disableRequestBody, updateRequestBody } from "../../../fixtures/request/user";

describe('DELETE :: Delete User', () => {
 
  it('Deletes a user successfully', () => {   
    cy.api({
      method: 'DELETE', 
      url: routes.DELETE,
      auth: auth,
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.null;
      expect(res.body.id).to.equal('55');
    });
  });

  it('DELETE with invalid token', () => {
    cy.api({
      method: 'DELETE',
      url: routes.DELETE,
      //auth: auth,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.exist;
    });
  });

});
