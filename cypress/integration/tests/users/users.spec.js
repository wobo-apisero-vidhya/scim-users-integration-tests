/// <reference types="cypress" />

const randomEmail = require("random-email");

describe('Post API', () => {
  it('should add a new post successfully', () => {
    cy.api({
      method: 'POST',
      url: '/scim/Users',
      auth: {bearer: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJXT1JLQk9BUkRJTkM6XC9cL1wvd2IiLCJhdWQiOlsiXC9hcGlzXC9zY2ltIl0sImlhdCI6MTY0Mjc0MjgxMywic3ViIjoic2NpbTp0b2tlbjpPRFE0TmpNNE56VTVOVE01T1ElM0QlM0QiLCJ0ZW5hbnRJZCI6ImRlZmF1bHQiLCJhZG1pbiI6Ik56azVOVFkxTkRNeE1nJTNEJTNEIn0.h76r_cSlKFtyJ4PfyOOQP2kJ4MqpK79rChCiQ9M_Ghlm2RR3BQRvZxOqp0Oqc2kjcN7-iEdhU6lMZ_0_S-kZy58IBmVQp72ciHLfu52cRF9osP8J95ilbIuyUscKfnPS4n3X7hmAl8dIwrm8GfNRN69AeJPpaZ_ADv8-OGUOTl8'},
      body: {
        schemas: [
            "urn:ietf:params:scim:schemas:core:2.0:User",
            "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],
        externalId: "0a21f0f2-8d2a-4f8e-bf98-7363c4aed4ef",
        userName: "john.doe@workboard.com",
        active: true,
        emails: [{
            "primary": true,
            "type": "work",
            "value": "john.doe@workboard.com"
        }],
        meta: {
            "resourceType": "User"
        },
        name: {
            "formatted": "givenName familyName",
            "familyName": "Doe",
            "givenName": "John"
        },
        roles: []
    },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.id).to.equal('55');
    });
  });
});

describe('PATCH API :: Update User', () => {
  it('Performs all the updates successfully', () => {
    
    cy.api({
      method: 'PATCH', 
      url: 'scim/Users/9',
      auth: {
        bearer: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJXT1JLQk9BUkRJTkM6XC9cL1wvd2IiLCJhdWQiOlsiXC9hcGlzXC9zY2ltIl0sImlhdCI6MTY0Mjc0MjgxMywic3ViIjoic2NpbTp0b2tlbjpPRFE0TmpNNE56VTVOVE01T1ElM0QlM0QiLCJ0ZW5hbnRJZCI6ImRlZmF1bHQiLCJhZG1pbiI6Ik56azVOVFkxTkRNeE1nJTNEJTNEIn0.h76r_cSlKFtyJ4PfyOOQP2kJ4MqpK79rChCiQ9M_Ghlm2RR3BQRvZxOqp0Oqc2kjcN7-iEdhU6lMZ_0_S-kZy58IBmVQp72ciHLfu52cRF9osP8J95ilbIuyUscKfnPS4n3X7hmAl8dIwrm8GfNRN69AeJPpaZ_ADv8-OGUOTl8"
      },
      body: {
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
        "Operations": [
                {
                "op": "Replace",
                "path": "emails[type eq \"work\"].value",
                "value": randomEmail({domain: "workboard.com"})
                },
                {
                "op": "Replace",
                "path": "name.familyName",
                "value": "Doe"
                }
        ]
    } 
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.null;
      expect(res.body.id).to.equal('9');
      expect(res.body.name.familyName).to.exist;
      expect(res.body.name.familyName).to.equal("Doe");
      expect(res.body.emails).to.exist;
    });
  });
});

describe('PATCH API :: Disable User', () => {
  it('Disables the user successfully', () => {
    
    cy.api({
      method: 'PATCH', 
      url: 'scim/Users/9/',
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
      expect(res.body.id).to.equal('9');
      expect(res.body.active).to.exist;
      expect(res.body.active).to.equal(false);
    });
  });
});

describe('DELETE API :: Delete User', () => {
  it('Deletes a user successfully', () => {
    
    cy.api({
      method: 'DELETE', 
      url: 'scim/Users/9',
      auth: {
        bearer: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJXT1JLQk9BUkRJTkM6XC9cL1wvd2IiLCJhdWQiOlsiXC9hcGlzXC9zY2ltIl0sImlhdCI6MTY0Mjc0MjgxMywic3ViIjoic2NpbTp0b2tlbjpPRFE0TmpNNE56VTVOVE01T1ElM0QlM0QiLCJ0ZW5hbnRJZCI6ImRlZmF1bHQiLCJhZG1pbiI6Ik56azVOVFkxTkRNeE1nJTNEJTNEIn0.h76r_cSlKFtyJ4PfyOOQP2kJ4MqpK79rChCiQ9M_Ghlm2RR3BQRvZxOqp0Oqc2kjcN7-iEdhU6lMZ_0_S-kZy58IBmVQp72ciHLfu52cRF9osP8J95ilbIuyUscKfnPS4n3X7hmAl8dIwrm8GfNRN69AeJPpaZ_ADv8-OGUOTl8"
      }
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.not.be.null;
      expect(res.body.id).to.equal('9');
    });
  });
});