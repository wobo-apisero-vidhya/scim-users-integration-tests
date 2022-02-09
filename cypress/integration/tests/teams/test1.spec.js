/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, dynamicTeamUsers, teamPayload } from "../../../fixtures/request/teams"

before('create new test users and form an heirarchy', () => {
  dynamicTeamUsers.forEach(user => {
    var newRequestBody = createRequestBody
    newRequestBody.userName = user.userName
    newRequestBody.emails[0].value = user.email
    newRequestBody.name.familyName = user.familyName
    newRequestBody.name.givenName = user.givenName
    //it("should create a new team successfully", () => {
      cy.api({
        method: "POST",
        url: routes.POST,
        auth: auth,
        body: newRequestBody,
      }).then((response) => {
        console.log('created successfully')
      });
   // });
  })
});

let userId = 0
describe('GET :: get User', () => {

  dynamicTeamUsers.forEach(user => {
    let newRequestBody = createRequestBody
    newRequestBody.userName = user.userName
    newRequestBody.emails[0].value = user.email
    newRequestBody.name.familyName = user.familyName
    newRequestBody.name.givenName = user.givenName
    it("should create a new team successfully", () => {
      cy.api({
        method: "POST",
        url: routes.POST,
        auth: auth,
        body: newRequestBody,
      }).then((response) => {
        console.log('created successfully')
      });
    });
  })

  it('should get user by UserID', () => {
    cy.api({
      method: 'GET',
      url: routes.GET_BY_ID + userId,
      auth: auth,
    }).then((response) => {
      console.log(response.body)
      expect(response.status).to.equal(200);
      expect(response.body).to.exist;
    });
  });
});