/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { disableRequestBody, updateRequestBody, updateEmailRequestBody } from "../../../fixtures/request/user";

describe('PATCH :: Update User', () => {
  
  it('Performs all the updates successfully', () => {    
    cy.api({
      method: 'PATCH', 
      url: routes.UPDATE,
      auth: auth,
      body: updateRequestBody 
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.null;
      expect(res.body.id).to.equal('55');
      expect(res.body.name.familyName).to.exist;
      expect(res.body.name.familyName).to.equal("Shinu");
      expect(res.body.name.givenName).to.exist;
      expect(res.body.name.givenName).to.equal("Kiba");
    });
  });

  it('Update existing resource', () => {    
    cy.api({
      method: 'PATCH', 
      url: routes.UPDATE,
      auth: auth,
      body: updateRequestBody 
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.null;
      expect(res.body.id).to.equal('55');
      expect(res.body.name.familyName).to.exist;
    });
  });

  it('Update existing resource email', () => {    
    cy.api({
      method: 'PATCH', 
      url: routes.UPDATE,
      auth: auth,
      failOnStatusCode: false,
      body: updateEmailRequestBody 
    }).then((res) => {
      expect(res.status).to.equal(400);
      expect(res.body.detail).to.equal("Resource email address is invalid, it already exists in the system!")
    });
  });

  it('Update with invalid token', () => {
    cy.api({
      method: 'PATCH', 
      url: routes.UPDATE,
      //auth: auth,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.exist;
    });
  });
});




describe('PATCH :: Disable User', () => {

  it('Disables the user successfully', () => {
    cy.api({
      method: 'PATCH', 
      url: routes.DISABLE,
      auth: auth,
      body: disableRequestBody, 
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.null;
      expect(res.body.id).to.equal('9');
      expect(res.body.active).to.exist;
      expect(res.body.active).to.equal(false);
    });
  });

  it('Disable non existing user', () => {
    cy.api({
      method: 'PATCH', 
      url: routes.DISABLE_INVALID_ID,
      auth: auth,
      body: disableRequestBody, 
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body.active).to.equal(false);
    });
  });

  it('Disable with invalid token', () => {
    cy.api({
      method: 'PATCH', 
      url: routes.DISABLE,
      //auth: auth,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.exist;
    });
  });
});

