import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { managerUpdateBody, test_scenario_3 } from "../../../fixtures/request/teams";

let userId = 0;
let group = []

describe('Scenario 3 - Change an L3 Team Manager’s Reporting in AAD. New reporting manager already has a team.', () => {
  it("Fetch employee Id", () => {
    cy.api({
      method: 'GET',
      url: routes.DYNAMIC_TEAMS_GET_BY_USERNAME + test_scenario_3.userEmail,
      auth: auth,
    }).then((response) => {
      userId = response.body.Resources[0].id;
      expect(response.body.Resources[0].userName).to.equal(test_scenario_3.userEmail);
    });
  });

  it("Assign new manager to the user", () => {
    let newManagerUpdateBody = managerUpdateBody
    newManagerUpdateBody.Operations[0].value = test_scenario_3.newManagerEmail;
    cy.api({
      method: "PATCH",
      url: routes.UPDATE + userId,
      auth: auth,
      body: newManagerUpdateBody,
    }).then((response) => {
      //assert that the manager of the user is updated
      expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_3.newManagerEmail);
      // assert that the user is now a part of the new manager's team(group)
      expect(response.body.groups).to.exist;
      group = response.body.groups.filter(group => group.name == test_scenario_3.newGroupName);
      expect(group[0].name).to.equal(test_scenario_3.newGroupName);
      // assert that the user is no more a part of the old manager's team(group)
      group = response.body.groups.filter(group => group.name == test_scenario_3.oldGroupName);
      expect(group.length).to.equal(0);
      // assert if the user's team reports to the new manager's team and not the old manager's team - the user should only be part of 2 groups
      expect(response.body.groups.length).to.equal(2);
      group = response.body.groups.filter(group => group.name == test_scenario_3.newGroupName);
      expect(group.length).to.equal(1);
      expect(group[0].name).to.equal(test_scenario_3.newGroupName);
      group = response.body.groups.filter(group => group.name == test_scenario_3.userGroupName);
      expect(group.length).to.equal(1);
      expect(group[0].name).to.equal(test_scenario_3.userGroupName);
    });
  });
});

describe('Undo the changes done to the setup', () => {
  it("Assign old manager to the user", () => {
    let newManagerUpdateBody = managerUpdateBody
    newManagerUpdateBody.Operations[0].value = test_scenario_3.oldManagerEmail;
    cy.api({
      method: "PATCH",
      url: routes.UPDATE + userId,
      auth: auth,
      body: newManagerUpdateBody,
    }).then((response) => {
      expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_3.oldManagerEmail);
    });
  });
});