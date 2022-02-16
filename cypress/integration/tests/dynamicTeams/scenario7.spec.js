import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, managerUpdateBody, test_scenario_7 } from "../../../fixtures/request/teams"

let userId = 0;

describe('Scenario 7 -  Remove an L3 manager from the organization (Email sent to changed user’s reporting manager). ', () => {

  it("Fetch user ID of Manager User", () => {
    cy.api({
      method: 'GET',
      url: routes.DYNAMIC_TEAMS_GET_BY_USERNAME + test_scenario_7.email,
      auth: auth,
    }).then((response) => {
      userId = response.body.Resources[0].id;
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
    });
  });
  it("Remove a Manager from organization", () => {
    cy.api({
      method: "DELETE",
      url: routes.DELETE + userId,
      auth: auth,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
      expect(response.body.id).to.equal(userId);
    });
  });
  it("Fetch user ID of previously reporting IC of removed Manager", () => {
    cy.api({
      method: 'GET',
      url: routes.DYNAMIC_TEAMS_GET_BY_USERNAME + test_scenario_7.reportingUserEmail,
      auth: auth,
    }).then((response) => {
      userId = response.body.Resources[0].id;
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
    });
  });
  it("Assign new manager to the IC user", () => {
    let newManagerUpdateBody = managerUpdateBody
    newManagerUpdateBody.Operations[0].value = test_scenario_7.promotedManagerEmail
    cy.api({
      method: "PATCH",
      url: routes.UPDATE + userId,
      auth: auth,
      body: newManagerUpdateBody,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
      expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_7.promotedManagerEmail)
    });
  });
});

describe('Undo the changes done in the setup', () => {
  it("Create removed Manager users", () => {
    let newRequestBody = createRequestBody;
    newRequestBody.userName = test_scenario_7.userName;
    newRequestBody.emails[0].value = test_scenario_7.email;
    newRequestBody.name.familyName = test_scenario_7.familyName;
    newRequestBody.name.givenName = test_scenario_7.givenName;
    cy.api({
      method: "POST",
      url: routes.POST,
      auth: auth,
      body: newRequestBody,
    }).then((response) => {
      expect(response.body.userName).to.equal(test_scenario_7.userName);
    });
  });
  it("Assign manager to the created user", () => {
    let newManagerUpdateBody = managerUpdateBody
    newManagerUpdateBody.Operations[0].value = test_scenario_7.managerEmail
    cy.api({
      method: "PATCH",
      url: routes.UPDATE + userId,
      auth: auth,
      body: newManagerUpdateBody,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
      expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_7.managerEmail)
    });
  });
  it("Fetch removed manager reporting user", () => {
    cy.api({
      method: 'GET',
      url: routes.DYNAMIC_TEAMS_GET_BY_USERNAME + test_scenario_7.reportingUserEmail,
      auth: auth,
    }).then((response) => {
      userId = response.body.Resources[0].id;
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;

    });
  });
  it("Assign old manager to the user to restore default heirarcy", () => {
    let newManagerUpdateBody = managerUpdateBody
    newManagerUpdateBody.Operations[0].value = test_scenario_7.email
    cy.api({
      method: "PATCH",
      url: routes.UPDATE + userId,
      auth: auth,
      body: newManagerUpdateBody,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
      expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_7.email)
    });
  });
});

