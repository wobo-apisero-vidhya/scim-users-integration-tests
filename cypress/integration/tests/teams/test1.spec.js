/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, dynamicTeamUsers} from "../../../fixtures/request/teams"



describe("POST :: create user", () => {

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
             // expect(response.body.userName).to.equal("john.doe@workboard.com");
            });
          });
    }) 
});