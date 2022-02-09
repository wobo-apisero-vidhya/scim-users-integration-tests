import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, dynamicTeamUsers } from "../../../fixtures/request/teams";

describe('create new test users and form an heirarchy', () => {
  dynamicTeamUsers.forEach(user => {
    it("should create a new team successfully", () => {
      let newRequestBody = createRequestBody;
      let newUser = {
        userName: user.userName,
        email: user.email,
        familyName: user.familyName,
        givenName: user.givenName
      };

      newRequestBody.userName = newUser.userName;
      newRequestBody.emails[0].value = newUser.email;
      newRequestBody.name.familyName = newUser.familyName;
      newRequestBody.name.givenName = newUser.givenName;

      cy.api({
        method: "POST",
        url: routes.POST,
        auth: auth,
        body: newRequestBody,
      }).then((response) => {
        expect(response.body.userName).to.equal(user.userName);
      });
    });
  });
});
