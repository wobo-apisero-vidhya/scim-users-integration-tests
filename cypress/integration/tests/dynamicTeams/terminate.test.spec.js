import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { managerEmployeeMap } from "../../../fixtures/request/teams";

describe('Create new test users and form an heirarchy', () => {
    //Fetches the manager Id and updates the user
    managerEmployeeMap.forEach(managerEmployee => {
        let userId = 0
        it("Fetch employee Id", () => {
            cy.api({
                method: 'GET',
                url: routes.DYNAMIC_TEAMS_GET_BY_USERNAME + managerEmployee.userEmail,
                auth: auth,
            }).then((response) => {
                userId = response.body.Resources[0].id;
            });
        });
        it("Delete a user", () => {
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
    })
});
