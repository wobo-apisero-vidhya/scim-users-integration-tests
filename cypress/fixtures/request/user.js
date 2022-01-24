const createRequestBody = {
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
}

export {createRequestBody}