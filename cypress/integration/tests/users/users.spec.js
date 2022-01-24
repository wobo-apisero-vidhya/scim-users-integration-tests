/// <reference types="cypress" />

import { routes } from "../../../config/routes";
import auth from "../../../fixtures/auth";
import {createRequestBody} from "../../../fixtures/request/user";

describe("User API", () => {
  it("should add a new user successfully", () => {
    cy.api({
      method: "POST",
      url: routes.POST,
      auth: auth,
      body: createRequestBody,
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.id).to.equal("55");
    });
  });

  it('Get user by UserID', () => {
    cy.api({
      method: 'GET',
      url: routes.GET,
      auth: auth,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.exist;
      expect(response.body[0].id).to.equal('1');
      expect(response.body[0].userName).to.equal("wobo-employee1@wobodev.com");
    });
  });
  
  it('Get user by filter', () => {
    cy.api({
      method: 'GET',
      url: routes.GET_FILTER,
      auth: auth,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.Resources).to.exist;
      expect(response.body.Resources[0].id).to.equal('1');
     });
  });

});

describe('PATCH API :: Update User', () => {
  it('Performs all the updates successfully', () => {
    
    cy.api({
      method: 'PATCH', 
      url: 'scim/Users/55',
      auth: {
        bearer: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJXT1JLQk9BUkRJTkM6XC9cL1wvd2IiLCJhdWQiOlsiXC9hcGlzXC9zY2ltIl0sImlhdCI6MTY0Mjc0MjgxMywic3ViIjoic2NpbTp0b2tlbjpPRFE0TmpNNE56VTVOVE01T1ElM0QlM0QiLCJ0ZW5hbnRJZCI6ImRlZmF1bHQiLCJhZG1pbiI6Ik56azVOVFkxTkRNeE1nJTNEJTNEIn0.h76r_cSlKFtyJ4PfyOOQP2kJ4MqpK79rChCiQ9M_Ghlm2RR3BQRvZxOqp0Oqc2kjcN7-iEdhU6lMZ_0_S-kZy58IBmVQp72ciHLfu52cRF9osP8J95ilbIuyUscKfnPS4n3X7hmAl8dIwrm8GfNRN69AeJPpaZ_ADv8-OGUOTl8"
      },
      body: {
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
        "Operations": [
                {
                "op": "Replace",
                "path": "name.givenName",
                "value": "Kiba"
                },
                {
                "op": "Replace",
                "path": "name.familyName",
                "value": "Shinu"
                }
        ]
    } 
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.null;
      expect(res.body.id).to.equal('55');
      expect(res.body.name.familyName).to.exist;
      expect(res.body.name.familyName).to.equal("Shinu");
      expect(res.body.name.givenName).to.exist;
      expect(res.body.name.givenName).to.equal("Kiba");
    });
  });
});

describe('PATCH API :: Disable User', () => {
  it('Disables the user successfully', () => {
    
    cy.api({
      method: 'PATCH', 
      url: 'scim/Users/55/',
      auth: {
        bearer: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJXT1JLQk9BUkRJTkM6XC9cL1wvd2IiLCJhdWQiOlsiXC9hcGlzXC9zY2ltIl0sImlhdCI6MTY0Mjc0MjgxMywic3ViIjoic2NpbTp0b2tlbjpPRFE0TmpNNE56VTVOVE01T1ElM0QlM0QiLCJ0ZW5hbnRJZCI6ImRlZmF1bHQiLCJhZG1pbiI6Ik56azVOVFkxTkRNeE1nJTNEJTNEIn0.h76r_cSlKFtyJ4PfyOOQP2kJ4MqpK79rChCiQ9M_Ghlm2RR3BQRvZxOqp0Oqc2kjcN7-iEdhU6lMZ_0_S-kZy58IBmVQp72ciHLfu52cRF9osP8J95ilbIuyUscKfnPS4n3X7hmAl8dIwrm8GfNRN69AeJPpaZ_ADv8-OGUOTl8"
      },
      body:{
        "Operations": [
            {
                "op": "Replace",
                "path": "active",
                "value": false
            }
        ],
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:PatchOp"
        ]
    } 
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.null;
      expect(res.body.id).to.equal('55');
      expect(res.body.active).to.exist;
      expect(res.body.active).to.equal(false);
    });
  });
});

describe('DELETE API :: Delete User', () => {
  it('Deletes a user successfully', () => {
    
    cy.api({
      method: 'DELETE', 
      url: 'scim/Users/55',
      auth: {
        bearer: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJXT1JLQk9BUkRJTkM6XC9cL1wvd2IiLCJhdWQiOlsiXC9hcGlzXC9zY2ltIl0sImlhdCI6MTY0Mjc0MjgxMywic3ViIjoic2NpbTp0b2tlbjpPRFE0TmpNNE56VTVOVE01T1ElM0QlM0QiLCJ0ZW5hbnRJZCI6ImRlZmF1bHQiLCJhZG1pbiI6Ik56azVOVFkxTkRNeE1nJTNEJTNEIn0.h76r_cSlKFtyJ4PfyOOQP2kJ4MqpK79rChCiQ9M_Ghlm2RR3BQRvZxOqp0Oqc2kjcN7-iEdhU6lMZ_0_S-kZy58IBmVQp72ciHLfu52cRF9osP8J95ilbIuyUscKfnPS4n3X7hmAl8dIwrm8GfNRN69AeJPpaZ_ADv8-OGUOTl8"
      }
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.null;
      expect(res.body.id).to.equal('55');
    });
  });
});
