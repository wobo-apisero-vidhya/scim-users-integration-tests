import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, dynamicTeamUsers} from "../../../fixtures/request/teams";
import async from 'async';

let created_users = [];
let count = 0;
let user_details = {
  id: "",
  username: ""
};

before('create new test users and form an heirarchy', () => {
    async.forEachSeries(dynamicTeamUsers, (user, done) => {
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
          user_details.id = response.body.id;
          user_details.username = response.body.userName;
          created_users[count] = user_details;
          count = count + 1;
        });
      });
});

describe('check user details', () => {
  it('should rectify the user ids and usernames', () => {
      expect(created_users[0].id).to.equal('79');
      expect(created_users[0].username).to.equal("");
    });
});