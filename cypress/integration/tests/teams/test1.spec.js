/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, dynamicTeamUsers, teamPayload} from "../../../fixtures/request/teams"

var teamUsersMap = [{
  email : "",
  id: ""
}]

before('create new test users and form an heirarchy', () => {
        var async = require('async');
        dynamicTeamUsers.forEach((user) => {
        var newRequestBody = createRequestBody
        newRequestBody.userName = user.userName
        newRequestBody.emails[0].value = user.email
        newRequestBody.name.familyName = user.familyName
        newRequestBody.name.givenName = user.givenName
        cy.api({
            method: "POST",
            url: routes.POST,
            auth: auth,
            body: newRequestBody,
            }).then((response) => {
              cy.log(newRequestBody)
              console.log('created successfully')
              console.log(response)
              // teamUsersMap.push({
              //   email: response.emails.value,
              //   id: response.id
              // })
            });
            console.log(teamUsersMap)
    }) 

    // it("should create a new team successfully", () => {
    //     cy.api({
    //       method: "POST",
    //       url: 'http://localhost/wb/apis/team/',
    //       auth: auth,
    //       body: teamPayload,
    //     }).then((response) => {
    //       expect(response.status).to.equal(201);
    //     });
    //   });
});
let userId = 0
describe('GET :: get User', () => {
  it('should get user by UserID', () => {
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
});