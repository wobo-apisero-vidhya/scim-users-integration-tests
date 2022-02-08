/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, dynamicTeamUsers, teamPayload} from "../../../fixtures/request/teams"


before('create new test users and form an heirarchy', () => {
    dynamicTeamUsers.forEach((user) => {
        var newRequestBody = createRequestBody
        newRequestBody.userName = user.userName
        newRequestBody.emails[0].value = user.email
        newRequestBody.name.familyName = user.familyName
        newRequestBody.name.givenName = user.givenName
        it("should add a new user successfully", () => {
            cy.api({
              method: "POST",
              url: routes.POST,
              auth: auth,
              body: newRequestBody,
            }).then((response) => {
              expect(response.status).to.equal(201);
            });
          });
    }) 

    it("should create a new team successfully", () => {
        cy.api({
          method: "POST",
          url: 'http://localhost/wb/apis/team/',
          auth: auth,
          body: teamPayload,
        }).then((response) => {
          expect(response.status).to.equal(201);
        });
      });
});

// describe("POST :: create user", () => {

    

// });