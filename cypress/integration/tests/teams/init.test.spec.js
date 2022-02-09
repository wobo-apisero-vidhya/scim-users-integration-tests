import { routes } from "../../../config/routes";
import auth from "../../../config/auth";
import { createRequestBody, dynamicTeamUsers , managerUpdateBody, managerEmployeeMap} from "../../../fixtures/request/teams";

describe('Create new test users and form an heirarchy', () => {
  dynamicTeamUsers.forEach(user => {
    it("Create new test users", () => {
      let newRequestBody = createRequestBody;
      
      newRequestBody.userName = user.userName;
      newRequestBody.emails[0].value = user.email;
      newRequestBody.name.familyName = user.familyName;
      newRequestBody.name.givenName = user.givenName;

      cy.api({
        method: "POST",
        url: routes.POST,
        auth: auth,
        body: newRequestBody,
      }).then((response) => {
        expect(response.body.userName).to.equal(user.userName);
      });
    });
  });


  //Fetches the manager Id and updates the user
  managerEmployeeMap.forEach(managerEmployee=>{
    let userId = 0
    it("Fetch employee Id", () => { 
      cy.api({
        method: 'GET',
        url: routes.DT_GET_BY_USERNAME + managerEmployee.userEmail,
        auth: auth,
      }).then((response) => {
        userId = response.body.Resources[0].id;
       });
    });
    it("Assign manager to the user", () => { 
      let newManagerUpdateBody = managerUpdateBody
      newManagerUpdateBody.Operations[0].value = managerEmployee.managerEmail
      cy.api({
        method: "PATCH",
        url: routes.UPDATE + userId,
        auth: auth,
        body: newManagerUpdateBody,
      }).then((response) => {
        console.log('Manager mapped successfully')
      });
    });
  }) 
});