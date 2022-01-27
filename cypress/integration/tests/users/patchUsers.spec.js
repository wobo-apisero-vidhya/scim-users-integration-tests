/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { disableRequestBody, updateRequestBody, updateEmailRequestBody } from "../../../fixtures/request/user";

let userId = 0;

before('fetch the newly created test user', () => {
  cy.api({
    method: 'GET',
    url: routes.GET_BY_USERNAME,
    auth: auth,
  }).then((response) => {
    userId = response.body.Resources[0].id;
   });
});

describe('PATCH :: Update User', () => {
  it('should perform all the updates successfully', () => {    
    cy.api({
      method: 'PATCH', 
      url: routes.UPDATE + userId,
      auth: auth,
      body: updateRequestBody 
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.null;
      expect(res.body.id).to.equal(userId);
      expect(res.body.name.familyName).to.exist;
      expect(res.body.name.familyName).to.equal("Shinu");
      expect(res.body.name.givenName).to.exist;
      expect(res.body.name.givenName).to.equal("Kiba");
    });
  });

  it('should throw error - Trying to have two objects with same email', () => {    
    cy.api({
      method: 'PATCH', 
      url: routes.UPDATE + (userId-1),
      auth: auth,
      failOnStatusCode: false,
      body: updateEmailRequestBody
    }).then((res) => {
      expect(res.status).to.equal(400);
      expect(res.body.detail).to.equal("Resource email address is invalid, it already exists in the system!")
    });
  });

  it('should throw error - Update with invalid token', () => {
    cy.api({
      method: 'PATCH', 
      url: routes.UPDATE + userId,
      //auth: auth,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.exist;
    });
  });
});




describe('PATCH :: Disable User', () => {
  it('should disable the user successfully', () => {
    cy.api({
      method: 'PATCH', 
      url: routes.DISABLE + userId + "/",
      auth: auth,
      body: disableRequestBody, 
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.null;
      expect(res.body.id).to.equal(userId);
      expect(res.body.active).to.exist;
      expect(res.body.active).to.equal(false);
    });
  });

  it('should pass successfully - Disable non existing user', () => {
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

  it('should throw error - Disable with invalid token', () => {
    cy.api({
      method: 'PATCH', 
      url: routes.DISABLE + userId + "/",
      //auth: auth,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.exist;
    });
  });
});

