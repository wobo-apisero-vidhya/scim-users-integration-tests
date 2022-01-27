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

const invalidCreateRequestBody = {
    schemas: [
        "urn:ietf:params:scim:schemas:core:2.0:User",
        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],
    externalId: "0a21f0f2-8d2a-4f8e-bf98-7363c4aed4ef",
    userFullName: "john.doe@workboard.com",
    active: true,
    emails: [{
        "primary": true,
        "type": "work",
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

const updateRequestBody = {
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

const updateEmailRequestBodyNeg = {
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    "Operations": [
            {
            "op": "Replace",
            "path": "emails[type eq \"work\"].value",
            "value": "john.doe67@workboard.com"
            }
    ]
}

const randomNumber = parseInt(Math.random() * 100);
const updateEmailRequestBodyPos = {
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    "Operations": [
            {
            "op": "Replace",
            "path": "emails[type eq \"work\"].value",
            "value": "john.doe"+randomNumber+"@workboard.com"
            }
    ]
}

const disableRequestBody = {
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

export {createRequestBody, updateRequestBody, invalidCreateRequestBody, updateEmailRequestBodyPos, updateEmailRequestBodyNeg, disableRequestBody}