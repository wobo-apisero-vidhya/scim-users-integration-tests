/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, dynamicTeamUsers, teamPayload, managerUpdateBody ,test_scenario_2} from "../../../fixtures/request/teams"

// Test 2: Change an L4 Individual Contributor Reporting in AAD. New reporting manager does not have a team
// Assertions in WorkBoard
// User’s reporting manager changes
// A new team is created for new manager
// User is added to new manager’s team
// User is removed from old manager’s team

describe('Scenario 2 - Change an L4 Individual Contributor Reporting in AAD. New reporting manager does not have a team', () => {
    let userId = 0
    let currentManger = ""
    let group = []
    //Assigning user to new manager
    it("Fetch user ID", () => {
        cy.api({
            method: 'GET',
            url: routes.DT_GET_BY_USERNAME + test_scenario_2.userEmail,
            auth: auth,
        }).then((response) => {
            userId = response.body.Resources[0].id;
            //console.log(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress)
            currentManger = response.body.Resources[0]["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.null;
            expect(response.body.Resources[0].userName).to.equal(test_scenario_2.userEmail);
        });
        });
    it("Assign manager to the user", () => { 
        let newManagerUpdateBody = managerUpdateBody
        newManagerUpdateBody.Operations[0].value = test_scenario_2.newManagerEmail
        cy.api({
          method: "PATCH",
          url: routes.UPDATE + userId,
          auth: auth,
          body: newManagerUpdateBody,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.null;
            console.log('Manager restructre successful')
            expect(response.body.groups).to.exist;
            expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_2.newManagerEmail);
            expect(response.body.groups).to.exist;
            group = response.body.groups.filter(group => group.name == test_scenario_2.newGroupName);
            expect(group[0].name).to.equal(test_scenario_2.newGroupName);
            // assert that the user is no more a part of the old manager's team(group)
            group = response.body.groups.filter(group => group.name == test_scenario_2.oldGroupName);
            expect(group.length).to.equal(0);
        });
    });


    //Terminating test case and restructuring hierarcy to default hierarcy 
    it("Assign manager to the user", () => { 
        let newManagerUpdateBody = managerUpdateBody
        newManagerUpdateBody.Operations[0].value = currentManger
        cy.api({
          method: "PATCH",
          url: routes.UPDATE + userId,
          auth: auth,
          body: newManagerUpdateBody,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.null;
            expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(currentManger)
            console.log('Employee Manager map set to default successfully')
        });
    });
}); 


