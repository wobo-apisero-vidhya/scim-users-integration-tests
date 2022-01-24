/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../fixtures/auth";
import { createRequestBody, disableRequestBody, updateRequestBody } from "../../../fixtures/request/user";

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

describe('GET :: get User', () => {
  it('Get user by UserID', () => {
    cy.api({
      method: 'GET',
      url: routes.GET,
      auth: auth,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.exist;
      expect(response.body.id).to.equal('55');
      expect(response.body.userName).to.equal("john.doe@workboard.com");
    });
  });
  
  it('Get user by filter', () => {
    cy.api({
      method: 'GET',
      url: routes.GET_FILTER,
      auth: auth,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.Resources).to.exist;
      expect(response.body.Resources[0].id).to.equal('1');
     });
  });
})

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
      expect(res.body.id).to.equal('55');
      expect(res.body.active).to.exist;
      expect(res.body.active).to.equal(false);
    });
  });
});

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
});
