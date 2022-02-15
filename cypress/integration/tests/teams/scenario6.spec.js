import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, dynamicTeamUsers, teamPayload, managerUpdateBody, test_scenario_6 } from "../../../fixtures/request/teams"

describe('Scenario 6 - Remove an L4 from the organization (No email is sent)', () => {
    
    //Individual Contributor at L6
    
    let userId = 0
    it("Fetch user ID of IC", () => {
        cy.api({
            method: 'GET',
            url: routes.DYNAMIC_TEAMS_GET_BY_USERNAME + test_scenario_6.individualContributor.email,
            auth: auth,
        }).then((response) => {
            userId = response.body.Resources[0].id;
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.null;
        });
    });
    it("Remove an IC user from organization", () => {
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
    //Terminating test case and restructuring hierarcy to default hierarcy
    it("Create IC for restoring default hierarcy", () => {
        let newRequestBody = createRequestBody;
        newRequestBody.userName = test_scenario_6.individualContributor.userName;
        newRequestBody.emails[0].value = test_scenario_6.individualContributor.email;
        newRequestBody.name.familyName = test_scenario_6.individualContributor.familyName;
        newRequestBody.name.givenName = test_scenario_6.individualContributor.givenName;
        cy.api({
            method: "POST",
            url: routes.POST,
            auth: auth,
            body: newRequestBody,
        }).then((response) => {
            expect(response.body.userName).to.equal(test_scenario_6.individualContributor.userName);
        });
    });
    it("Assign manager to the IC user", () => {
        let newManagerUpdateBody = managerUpdateBody
        newManagerUpdateBody.Operations[0].value = test_scenario_6.individualContributor.managerEmail
        cy.api({
            method: "PATCH",
            url: routes.UPDATE + userId,
            auth: auth,
            body: newManagerUpdateBody,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.null;
            expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_6.individualContributor.managerEmail)
        });
    });


    //Manager at L4

    it("Fetch user ID of Manager User", () => {
        cy.api({
            method: 'GET',
            url: routes.DYNAMIC_TEAMS_GET_BY_USERNAME + test_scenario_6.managerUser.email,
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
            url: routes.DYNAMIC_TEAMS_GET_BY_USERNAME + test_scenario_6.managerUser.reportingUserEmail,
            auth: auth,
        }).then((response) => {
            userId = response.body.Resources[0].id;
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.null;
        });
    });
    it("Assign new manager to the IC user", () => {
        let newManagerUpdateBody = managerUpdateBody
        newManagerUpdateBody.Operations[0].value = test_scenario_6.managerUser.promotedManagerEmail
        cy.api({
            method: "PATCH",
            url: routes.UPDATE + userId,
            auth: auth,
            body: newManagerUpdateBody,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.null;
            expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_6.managerUser.promotedManagerEmail)
        });
    });
    //Terminating test case and restructuring hierarcy to default hierarcy
    it("Create removed Manager users", () => {
        let newRequestBody = createRequestBody;
        newRequestBody.userName = test_scenario_6.managerUser.userName;
        newRequestBody.emails[0].value = test_scenario_6.managerUser.email;
        newRequestBody.name.familyName = test_scenario_6.managerUser.familyName;
        newRequestBody.name.givenName = test_scenario_6.managerUser.givenName;
        cy.api({
            method: "POST",
            url: routes.POST,
            auth: auth,
            body: newRequestBody,
        }).then((response) => {
            expect(response.body.userName).to.equal(test_scenario_6.managerUser.userName);
        });
    });
    it("Assign manager to the created user", () => {
        let newManagerUpdateBody = managerUpdateBody
        newManagerUpdateBody.Operations[0].value = test_scenario_6.managerUser.managerEmail
        cy.api({
            method: "PATCH",
            url: routes.UPDATE + userId,
            auth: auth,
            body: newManagerUpdateBody,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.null;
            expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_6.managerUser.managerEmail)
        });
    });
    it("Fetch removed manager reporting user", () => {
        cy.api({
            method: 'GET',
            url: routes.DYNAMIC_TEAMS_GET_BY_USERNAME + test_scenario_6.managerUser.reportingUserEmail,
            auth: auth,
        }).then((response) => {
            userId = response.body.Resources[0].id;
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.null;
            
        });
    });
    it("Assign old manager to the user to restore default heirarcy", () => {
        let newManagerUpdateBody = managerUpdateBody
        newManagerUpdateBody.Operations[0].value = test_scenario_6.managerUser.email
        cy.api({
            method: "PATCH",
            url: routes.UPDATE + userId,
            auth: auth,
            body: newManagerUpdateBody,
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.not.be.null;
            expect(response.body["urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"].manager.managerEmailAddress).to.equal(test_scenario_6.managerUser.email)
        });
    });
});

