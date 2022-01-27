/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";

let userId = 0;

before('fetch the newly created test user', () => {
  cy.api({
    method: 'GET',
    url: routes.GET_FILTER,
    auth: auth,
  }).then((response) => {
    userId = response.body.Resources[0].id;
   });
});

describe('GET :: get User', () => {
  it('Get user by UserID', () => {
    cy.api({
      method: 'GET',
      url: routes.GET_BY_ID + userId,
      auth: auth,
    }).then((response) => {
      console.log(response.body)
      expect(response.status).to.equal(200);
      expect(response.body).to.exist;
      expect(response.body.id).to.equal(userId);
      expect(response.body.userName).to.equal("john.doe@workboard.com");
    });
  });

  it('Get all users', () => {
    cy.api({
      method: 'GET',
      url: routes.GET_ALL_USERS,
      auth: auth,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.exist;
    });
  });
  
  it('Get users by filter', () => {
    cy.api({
      method: 'GET',
      url: routes.GET_FILTER,
      auth: auth,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.Resources[0].id).to.equal('56');
      expect(response.body.Resources).to.exist;
     });
  });

  it('Get user by UserID - invalid token', () => {
    cy.api({
      method: 'GET',
      url: routes.GET_BY_ID + userId,
      //auth: auth,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body).to.exist;
    });
  });

  it('Get user by UserID - invalid UserID', () => {
    cy.api({
      method: 'GET',
      url: routes.GET_INVALID_ID,
      auth: auth,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body.detail).to.equal("The resource id "+ routes.GET_INVALID_ID.split("/").pop() + " doesn't exist or is invalid for provided resource");
    });
  });

  it('Get user by filter - empty response', () => {
    cy.api({
          method: 'GET',
          url: routes.GET_FILTER_EMPTY_RES,
          auth: auth,
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.Resources).to.exist;
          expect(response.body.Resources).to.deep.eq([]);
          expect(response.body.startIndex).to.eq('0');
         });
    });

  it('Get user by  invalid filter with response of all users from GET operation', () => {
    cy.api({
          method: 'GET',
          url: routes.GET_INVALID_FILTER,
          auth: auth,
        }).then((response) => {
          expect(response.status).to.equal(200);
         });
    });    
})

