/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";

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

