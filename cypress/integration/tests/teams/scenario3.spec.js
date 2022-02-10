import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { managerUpdateBody, test_scenario_3 } from "../../../fixtures/request/teams";

describe('Scenario 1 - Change an L3 Team Manager’s Reporting in AAD. New reporting manager already has a team.', () => {
  let userId = 0;
  let group = []

  it("Fetch employee Id", () => {
    cy.api({
      method: 'GET',
      url: routes.DT_GET_BY_USERNAME + test_scenario_3.userEmail,
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
      expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_3.newManagerEmail);
      expect(response.body.groups).to.not.equal([]);
      group = response.body.groups.filter(group => group.name == test_scenario_3.newGroupName);
      expect(group[0].name).to.equal(test_scenario_3.newGroupName);
      group = response.body.groups.filter(group => group.name == test_scenario_3.oldGroupName);
      expect(group.length).to.equal(0);
      
      
    });
  });
});