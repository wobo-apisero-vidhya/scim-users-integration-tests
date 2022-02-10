import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { managerUpdateBody, test_scenario_5 } from "../../../fixtures/request/teams";

let userId = 0;
let group = []

describe('Scenario 5 - Setup', () => {
  it("Fetch L2 employee Id", () => {
    cy.api({
      method: 'GET',
      url: routes.DT_GET_BY_USERNAME + test_scenario_5.L2userEmail,
      auth: auth,
    }).then((response) => {
      userId = response.body.Resources[0].id;
      expect(response.body.Resources[0].userName).to.equal(test_scenario_5.L2userEmail);
    });
  });

  it("Assign new L2 manager to the L2 user", () => {
    let newManagerUpdateBody = managerUpdateBody
    newManagerUpdateBody.Operations[0].value = test_scenario_5.L2newManagerEmail;
    cy.api({
      method: "PATCH",
      url: routes.UPDATE + userId,
      auth: auth,
      body: newManagerUpdateBody,
    }).then((response) => {
      // assert that the manager is changed
      expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_5.L2newManagerEmail);
      //assert that the user is added to the new manager's team
      expect(response.body.groups).to.exist;
      group = response.body.groups.filter(group => group.name == test_scenario_5.L2newGroupName);
      expect(group[0].name).to.equal(test_scenario_5.L2newGroupName);
      // assert that the user is no more a part of the old manager's team(group)
      group = response.body.groups.filter(group => group.name == test_scenario_5.L2oldGroupName);
      expect(group.length).to.equal(0);
      // assert that the user is part of it's team(group)
      group = response.body.groups.filter(group => group.name == test_scenario_5.L2userGroupName);
      expect(group.length).to.equal(1);
      expect(group[0].name).to.equal(test_scenario_5.L2userGroupName);
      // assert if the user's team reports to the new manager and not the old manager - the user should only be part of 2 groups
      expect(response.body.groups.length).to.equal(2);
      group = response.body.groups.filter(group => group.name == test_scenario_5.L2newGroupName);
      expect(group.length).to.equal(1);
      expect(group[0].name).to.equal(test_scenario_5.L2newGroupName);
      group = response.body.groups.filter(group => group.name == test_scenario_5.L2userGroupName);
      expect(group.length).to.equal(1);
      expect(group[0].name).to.equal(test_scenario_5.L2userGroupName);
    });
  });

  it("Fetch L3 employee Id", () => {
    cy.api({
      method: 'GET',
      url: routes.DT_GET_BY_USERNAME + test_scenario_5.L3userEmail,
      auth: auth,
    }).then((response) => {
      userId = response.body.Resources[0].id;
      expect(response.body.Resources[0].userName).to.equal(test_scenario_5.L3userEmail);
    });
  });

  it("Assign new L1 manager to the L3 user", () => {
    let newManagerUpdateBody = managerUpdateBody
    newManagerUpdateBody.Operations[0].value = test_scenario_5.L2oldManagerEmail;
    cy.api({
      method: "PATCH",
      url: routes.UPDATE + userId,
      auth: auth,
      body: newManagerUpdateBody,
    }).then((response) => {
      expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_5.L2oldManagerEmail);
      // assert that the L3 user is no more part of user's team(group)
      group = response.body.groups.filter(group => group.name == test_scenario_5.L2userGroupName);
      expect(group.length).to.equal(0);
      // assert that the L3 user reports to the new manager
      group = response.body.groups.filter(group => group.name == test_scenario_5.L2oldGroupName);
      expect(group.length).to.equal(1);
      expect(group[0].name).to.equal(test_scenario_5.L2oldGroupName);
    });
  });

  it("Fetch L3 employee Id", () => {
    cy.api({
      method: 'GET',
      url: routes.DT_GET_BY_USERNAME + test_scenario_5.L3teammateEmail,
      auth: auth,
    }).then((response) => {
      userId = response.body.Resources[0].id;
      expect(response.body.Resources[0].userName).to.equal(test_scenario_5.L3teammateEmail);
    });
  });

  it("Assign new L2 IC manager to the L3 teammate", () => {
    let newManagerUpdateBody = managerUpdateBody
    newManagerUpdateBody.Operations[0].value = test_scenario_5.L3userEmail;
    cy.api({
      method: "PATCH",
      url: routes.UPDATE + userId,
      auth: auth,
      body: newManagerUpdateBody,
    }).then((response) => {
      expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_5.L3userEmail);
      // assert that the L3 user is no more part of user's team(group)
      group = response.body.groups.filter(group => group.name == test_scenario_5.L2userGroupName);
      expect(group.length).to.equal(0);
      // assert that the L3 user who was promoted has its own team and the teammate reports to the L3 user now
      group = response.body.groups.filter(group => group.name == test_scenario_5.L3userGroupName);
      expect(group.length).to.equal(1);
      expect(group[0].name).to.equal(test_scenario_5.L3userGroupName);
    });
  });
});

describe('Undo the changes done in the setup', () => {
  it("Fetch L2 employee Id", () => {
    cy.api({
      method: 'GET',
      url: routes.DT_GET_BY_USERNAME + test_scenario_5.L2userEmail,
      auth: auth,
    }).then((response) => {
      userId = response.body.Resources[0].id;
      expect(response.body.Resources[0].userName).to.equal(test_scenario_5.L2userEmail);
    });
  });

  it("Assign old manager to the user", () => {
    let newManagerUpdateBody = managerUpdateBody
    newManagerUpdateBody.Operations[0].value = test_scenario_5.L2oldManagerEmail;
    cy.api({
      method: "PATCH",
      url: routes.UPDATE + userId,
      auth: auth,
      body: newManagerUpdateBody,
    }).then((response) => {
      expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_5.L2oldManagerEmail);
    });
  });

  it("Fetch L3 employee Id", () => {
    cy.api({
      method: 'GET',
      url: routes.DT_GET_BY_USERNAME + test_scenario_5.L3userEmail,
      auth: auth,
    }).then((response) => {
      userId = response.body.Resources[0].id;
      expect(response.body.Resources[0].userName).to.equal(test_scenario_5.L3userEmail);
    });
  });

  it("Assign back L2 manager to the L3 promoted user", () => {
    let newManagerUpdateBody = managerUpdateBody
    newManagerUpdateBody.Operations[0].value = test_scenario_5.L2userEmail;
    cy.api({
      method: "PATCH",
      url: routes.UPDATE + userId,
      auth: auth,
      body: newManagerUpdateBody,
    }).then((response) => {
      expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_5.L2userEmail);
    });
  });

  it("Fetch L3 employee Id", () => {
    cy.api({
      method: 'GET',
      url: routes.DT_GET_BY_USERNAME + test_scenario_5.L3teammateEmail,
      auth: auth,
    }).then((response) => {
      userId = response.body.Resources[0].id;
      expect(response.body.Resources[0].userName).to.equal(test_scenario_5.L3teammateEmail);
    });
  });

  it("Assign back L2 manager to the L3 teammate user", () => {
    let newManagerUpdateBody = managerUpdateBody
    newManagerUpdateBody.Operations[0].value = test_scenario_5.L2userEmail;
    cy.api({
      method: "PATCH",
      url: routes.UPDATE + userId,
      auth: auth,
      body: newManagerUpdateBody,
    }).then((response) => {
      expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_5.L2userEmail);
    });
  });
});