import { bearer } from "../../../config/auth"


let configPayload = {
    "enable_org_encryption_content":"savetest",
    "enable_org_encryption":1,
    "team_provisioning":{
       "enabled":true,
       "protocol":"SCIM",
       "created_from_flag":"scim_based_team_provisioning",
       "kb_link_url":"https:\/\/workboard.zendesk.com\/hc\/en-us\/articles\/360055771091",
       "name_pattern":"{{first_name}} {{last_name}} ({{email_alias}})"
    },
    "display_nested_kr":1,
    "cnc_users":"",
} 
let sqlFetchUserId = "SELECT uid FROM tbl_user_apps WHERE access_token LIKE '" + bearer + "'";
let sqlGetOrgUnitId = "SELECT * FROM tbl_organization_unit_role_map WHERE user_id = "
let sqlUpdateOrgConfig = "UPDATE tbl_org_config SET data = '" + JSON.stringify(configPayload) + "' WHERE org_id = "

describe('Configuring data base to enable dynamic feature', () => {
    it("Add config to data column in 'org_config' table", () => {
        let userId = -1;
        let orgId = -1;
        //Fetch the userId from table_users_app
        cy.task(
            "queryDb",
            sqlFetchUserId
          ).then(response=> {
                userId = response[0]['uid']
                
                //Fetch table_org_unit_id using userID
                cy.task(
                    "queryDb",
                    sqlGetOrgUnitId + userId
                  ).then(response => {
                    orgId = response[0]['org_unit_id']  
                    console.log(sqlUpdateOrgConfig + orgId)
                    
                    //Update table_org_config based on org_id 
                    cy.task(
                        "queryDb",
                        sqlUpdateOrgConfig + orgId
                      ).then(response => {
                        console.log("Config added successfully")
                      });
                  });
          });
    });
});