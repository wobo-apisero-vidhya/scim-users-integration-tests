/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, dynamicTeamUsers, teamPayload, managerUpdateBody, test_scenario_1 } from "../../../fixtures/request/teams"

// Test 1: Change an L4 Individual Contributor Reporting in AAD. New reporting manager already has a team
// Assertions in WorkBoard
// User’s reporting manager changes
// User is added to new manager’s team
// User is removed from old manager’s team

describe('Scenario 1 - Change an L4 Individual Contributor Reporting in AAD. New reporting manager already has a team', () => {
    let userId = 0
    let currentManger = ""
    let group = []
    //Assigning user to new manager
    it("Fetch user ID", () => {
        cy.api({
            method: 'GET',
            url: routes.DT_GET_BY_USERNAME + test_scenario_1.userEmail,
            auth: auth,
        }).then((response) => {
            userId = response.body.Resources[0].id;
            //console.log(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress)
            currentManger = response.body.Resources[0]["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress
            console.log(currentManger)
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.null;
            expect(response.body.Resources[0].userName).to.equal(test_scenario_1.userEmail);
        });
    });
    it("Assign new manager to the user", () => {
        let newManagerUpdateBody = managerUpdateBody
        newManagerUpdateBody.Operations[0].value = test_scenario_1.newManagerEmail
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
            //assert that the manager of the user is updated
            expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_1.newManagerEmail);
            // assert that the user is now a part of the new manager's team(group)
            expect(response.body.groups).to.exist;
            group = response.body.groups.filter(group => group.name == test_scenario_1.newGroupName);
            expect(group[0].name).to.equal(test_scenario_1.newGroupName);
            // assert that the user is no more a part of the old manager's team(group)
            group = response.body.groups.filter(group => group.name == test_scenario_1.oldGroupName);
            expect(group.length).to.equal(0);
        });
    });


    //Terminating test case and restructuring hierarcy to default hierarcy 
    it("Assign old manager to the user", () => {
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
        });
    });
}); 