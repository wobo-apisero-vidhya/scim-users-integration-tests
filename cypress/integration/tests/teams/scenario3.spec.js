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
  async.forEachSeries(dynamicTeamUsers, (user, cb) => {
    var newRequestBody = {
      schemas: [],
      externalId: "",
      userName: "",
      active: null,
      emails: [],
      meta: null,
      name: null,
      roles: []
    }
        var newUser = {
          userName: "",
          email: "",
          familyName: "",
          givenName: ""
        }

        newRequestBody.schemas = createRequestBody.schemas;
        newRequestBody.externalId = createRequestBody.externalId;
        newRequestBody.active = createRequestBody.active;
        newRequestBody.emails = createRequestBody.emails;
        newRequestBody.meta = createRequestBody.meta;
        newRequestBody.name = createRequestBody.name;

        newUser.userName = user.userName;
        newUser.email = user.email;
        newUser.familyName = user.familyName;
        newUser.givenName = user.givenName;

        newRequestBody.userName = newUser.userName
        newRequestBody.emails[0].value = newUser.email
        newRequestBody.name.familyName = newUser.familyName
        newRequestBody.name.givenName = newUser.givenName

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
        cb()
      });
});

describe('check user details', () => {
  it('should rectify the user ids and usernames', () => {
      expect(created_users[0].id).to.equal('78');
      expect(created_users[0].username).to.equal("");
    });
});