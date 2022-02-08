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
        userName: "andrew.smith@workboard.com",
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
        }
    ],
    "team_workstream": [
        {
            "name": "Identity service",
            "type": "1"
        }
    ],
    "external_id":""
}

const dynamicTeamHeirarchy = [
    {
        "team_owner":"jackie.smith@workboard.com",
        "team_name":"Identity-jackie",
        "team_type":"working_group",
        "team_members": [
            {
                "id": "",
                "team_role": "co-manager",
            },
            {
                "id": "",
                "team_role": "co-manager",
            }
        ],
        "external_id":"041"
    },
    {
        "team_owner":"jack.miranda@workboard.com",
        "team_name":"Identity-jack",
        "team_type":"functional",
        "parent_team_id": "041",
        "team_members": [
            {
                "id": "",
                "team_role": "exec_viewer",
            },
            {
                "id": "",
                "team_role": "co_manager",
            }
        ],
        "external_id":"042"
    },
    {
        "team_owner":"hassan.hassani@workboard.com",
        "team_name":"Identity-hassan",
        "team_type":"functional",
        "parent_team_id": "041",
        "team_members": [
            {
                "id": "",
                "team_role": "exec_viewer",
            },
            {
                "id": "",
                "team_role": "co_manager",
            }
        ],
        "external_id":"043"
    },
    {
        "team_owner":"zahra.mcbeth@workboard.com",
        "team_name":"Identity-zahra",
        "team_type":"functional",
        "parent_team_id": "042",
        "external_id":"044"
    },
    {
        "team_owner":"jill.mill@workboard.com",
        "team_name":"Identity-jill",
        "team_type":"functional",
        "parent_team_id": "042",
        "team_members": [
            {
                "id": "",
                "team_role": "co_manager",
            }
        ],
        "external_id":"045"
    },
    {
        "team_owner":"mark.powel@workboard.com",
        "team_name":"Identity-mark",
        "team_type":"functional",
        "parent_team_id": "043",
        "team_members": [
            {
                "id": "",
                "team_role": "exec_viewer",
            },
            {
                "id": "",
                "team_role": "co_manager",
            }
        ],
        "external_id":"046"
    },
    {
        "team_owner":"matt.almenu@workboard.com",
        "team_name":"Identity-matt",
        "team_type":"functional",
        "parent_team_id": "045",
        "external_id":"047"
    },
    {
        "team_owner":"virgina.hemenz@workboard.com",
        "team_name":"Identity-virgina",
        "team_type":"functional",
        "parent_team_id": "046",
        "external_id":"048"
    },
    {
        "team_owner":"andrew.smith@workboard.com",
        "team_name":"Identity-andrew",
        "team_type":"functional",
        "parent_team_id": "046",
        "team_members": [
            {
                "id": "",
                "team_role": "team_admin",
            }
        ],
        "external_id":"049"
    },
    {
        "team_owner":"elizibath.kerby@workboard.com",
        "team_name":"Identity-elizibath",
        "team_type":"functional",
        "parent_team_id": "049",
        "external_id":"050"
    }
]



export {createRequestBody, dynamicTeamUsers, teamPayload}