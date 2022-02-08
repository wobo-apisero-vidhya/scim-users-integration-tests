const createRequestBody = {
    schemas: [
        "urn:ietf:params:scim:schemas:core:2.0:User",
        "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],
    externalId: "0a21f0f2-8d2a-4f8e-bf98-7363c4aed4ef",
    userName: "",
    active: true,
    emails: [{
        "primary": true,
        "type": "work",
        "value": ""
    }],
    meta: {
        "resourceType": "User"
    },
    name: {
        "formatted": "givenName familyName",
        "familyName": "",
        "givenName": ""
    },
    roles: []
}

const dynamicTeamUsers = [
    {
        userName: "jackie.smith@workboard.com",
        email: "jackie.smith@workboard.com",
        familyName: "jackie",
        givenName: "smith"
    },
    {
        userName: "jack.miranda@workboard.com",
        email: "jack.miranda@workboard.com",
        familyName: "jack",
        givenName: "miranda"  
    },
    {
        userName: "hassan.hassani@workboard.com",
        email: "hassan.hassani@workboard.com",
        familyName: "hassan",
        givenName: "hassani"  
    },
    {
        userName: "hassan.hassani@workboard.com",
        email: "hassan.hassani@workboard.com",
        familyName: "hassan",
        givenName: "hassani"  
    },
    {
        userName: "zahra.mcbeth@workboard.com",
        email: "zahra.mcbeth@workboard.com",
        familyName: "zahra",
        givenName: "mcbeth"  
    },
    {
        userName: "jill.mill@workboard.com",
        email: "jill.mill@workboard.com",
        familyName: "jill",
        givenName: "mill"  
    },
    {
        userName: "mark.powel@workboard.com",
        email: "mark.powel@workboard.com",
        familyName: "mark",
        givenName: "powel"  
    },
    {
        userName: "sanjeeve.vikas@workboard.com",
        email: "sanjeeve.vikas@workboard.com",
        familyName: "sanjeeve",
        givenName: "vikas"  
    },
    {
        userName: "reddy.paramadhama@workboard.com",
        email: "reddy.paramadhama@workboard.com",
        familyName: "reddy",
        givenName: "paramadhama"  
    },
    {
        userName: "matt.almenu@workboard.com",
        email: "matt.almenu@workboard.com",
        familyName: "matt",
        givenName: "almenu"  
    },
    {
        userName: "virgina.hemenz@workboard.com",
        email: "virgina.hemenz@workboard.com",
        familyName: "virgina",
        givenName: "hemenz"  
    },
    {
        userName: "andrewa.smith@workboard.com",
        email: "andrewa.smith@workboard.com",
        familyName: "andrew",
        givenName: "smith"  
    },
    {
        userName: "albert.lambert@workboard.com",
        email: "albert.lambert@workboard.com",
        familyName: "albert",
        givenName: "lambert"  
    },
    {
        userName: "rozanne.mcmillian@workboard.com",
        email: "rozanne.mcmillian@workboard.com",
        familyName: "rozanne",
        givenName: "mcmillian"  
    },
    {
        userName: "kelly.sergent@workboard.com",
        email: "kelly.sergent@workboard.com",
        familyName: "kelly",
        givenName: "sergent"  
    },
    {
        userName: "elizibath.kerby@workboard.com",
        email: "elizibath.kerby@workboard.com",
        familyName: "elizibath",
        givenName: "kerby"  
    }
]

const teamPayload = {
    "team_owner":"",
    "team_name":"",
    "team_type":"",
    "team_members": [
        {
            "id": "",
            "team_role": "",
            "first_name": "",
            "last_name": "",
            "email": ""
        }
    ],
    "team_workstream": [
        {
            "name": "",
            "type": ""
        }
    ],
    "external_id":""
}

const dynamicTeamHeirarchy = [
    {}
]



export {createRequestBody, dynamicTeamUsers, teamPayload}