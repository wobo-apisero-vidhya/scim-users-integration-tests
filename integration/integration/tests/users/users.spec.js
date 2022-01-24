/// <reference types="cypress" />

describe('Post API', () => {
  it('should add a new post successfully', () => {
    cy.api({
      method: 'POST',
      url: '/scim/Users',
      auth: {bearer: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJXT1JLQk9BUkRJTkM6XC9cL1wvd2IiLCJhdWQiOlsiXC9hcGlzXC9zY2ltIl0sImlhdCI6MTY0MjY3MDAwMCwic3ViIjoic2NpbTp0b2tlbjpPRFE0TmpNNE56VTVOVE01T1ElM0QlM0QiLCJ0ZW5hbnRJZCI6ImRlZmF1bHQiLCJhZG1pbiI6Ik9UazVORFUyTnpnNSJ9.OWyulxgzNBk5IJK6LE2gHMecsrS5Uq4uvpBuQXBDcHXO6i7KjCQ_aDobZMqw8zMSZQsCjISt5gsECVQSAY1I0VkE3XGnLAsTdYCKYHgWANDIABZv9Dj-IALtz8rR7tB11Q-4wS21BRWAPSADTZcB4Rm53Na8UVOAJSdO5Vy2DVk'},
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
