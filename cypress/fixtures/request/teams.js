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
        userName: "jackie.smith.wobo@workboard.com",
        email: "jackie.smith.wobo@workboard.com",
        familyName: "jackie",
        givenName: "smith"
    },
    {
        userName: "jack.miranda.wobo@workboard.com",
        email: "jack.miranda.wobo@workboard.com",
        familyName: "jack",
        givenName: "miranda"  
    },
    {
        userName: "hassan.hassani.wobo@workboard.com",
        email: "hassan.hassani.wobo@workboard.com",
        familyName: "hassan",
        givenName: "hassani"  
    },
    {
        userName: "zahra.mcbeth.wobo@workboard.com",
        email: "zahra.mcbeth.wobo@workboard.com",
        familyName: "zahra",
        givenName: "mcbeth"  
    },
    {
        userName: "jill.mill.wobo@workboard.com",
        email: "jill.mill.wobo@workboard.com",
        familyName: "jill",
        givenName: "mill"  
    },
    {
        userName: "mark.powel.wobo@workboard.com",
        email: "mark.powel.wobo@workboard.com",
        familyName: "mark",
        givenName: "powel"  
    },
    {
        userName: "sanjeeve.vikas.wobo@workboard.com",
        email: "sanjeeve.vikas.wobo@workboard.com",
        familyName: "sanjeeve",
        givenName: "vikas"  
    },
    {
        userName: "reddy.paramadhama.wobo@workboard.com",
        email: "reddy.paramadhama.wobo@workboard.com",
        familyName: "reddy",
        givenName: "paramadhama"  
    },
    {
        userName: "matt.almenu.wobo@workboard.com",
        email: "matt.almenu.wobo@workboard.com",
        familyName: "matt",
        givenName: "almenu"  
    },
    {
        userName: "virgina.hemenz.wobo@workboard.com",
        email: "virgina.hemenz.wobo@workboard.com",
        familyName: "virgina",
        givenName: "hemenz"  
    },
    {
        userName: "andrewa.smith.wobo@workboard.com",
        email: "andrewa.smith.wobo@workboard.com",
        familyName: "andrew",
        givenName: "smith"  
    },
    {
        userName: "albert.lambert.wobo@workboard.com",
        email: "albert.lambert.wobo@workboard.com",
        familyName: "albert",
        givenName: "lambert"  
    },
    {
        userName: "rozanne.mcmillian.wobo@workboard.com",
        email: "rozanne.mcmillian.wobo@workboard.com",
        familyName: "rozanne",
        givenName: "mcmillian"  
    },
    {
        userName: "kelly.sergent.wobo@workboard.com",
        email: "kelly.sergent.wobo@workboard.com",
        familyName: "kelly",
        givenName: "sergent"  
    },
    {
        userName: "elizibath.kerby.wobo@workboard.com",
        email: "elizibath.kerby.wobo@workboard.com",
        familyName: "elizibath",
        givenName: "kerby"  
    }
]

export {createRequestBody, dynamicTeamUsers, teamPayload}