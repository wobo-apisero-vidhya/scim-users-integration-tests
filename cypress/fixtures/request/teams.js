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
        userName: "andrew.smith.wobo@workboard.com",
        email: "andrew.smith.wobo@workboard.com",
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
    },
    {
        userName: "lisa.flat.wobo@workboard.com",
        email: "lisa.flat.wobo@workboard.com",
        familyName: "lisa",
        givenName: "flat"
    }
]

const managerUpdateBody = {
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:PatchOp"
    ],
    "Operations": [
        {
            "op": "Add",
            "path": "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:manager",
            "value": ""
        }
    ]
}

const managerEmployeeMap = [
    {
        userEmail: 'jackie.smith.wobo@workboard.com',
        managerEmail: 'wobo-employee4@wobodev.com',
    },
    {
        userEmail: 'jack.miranda.wobo@workboard.com',
        managerEmail: 'jackie.smith.wobo@workboard.com',
    },
    {
        userEmail: 'hassan.hassani.wobo@workboard.com',
        managerEmail: 'jackie.smith.wobo@workboard.com',
    },
    {
        userEmail: 'zahra.mcbeth.wobo@workboard.com',
        managerEmail: 'jack.miranda.wobo@workboard.com',
    },
    {
        userEmail: 'sanjeeve.vikas.wobo@workboard.com',
        managerEmail: 'zahra.mcbeth.wobo@workboard.com',
    },
    {
        userEmail: 'jill.mill.wobo@workboard.com',
        managerEmail: 'jack.miranda.wobo@workboard.com',
    },
    {
        userEmail: 'reddy.paramadhama.wobo@workboard.com',
        managerEmail: 'jill.mill.wobo@workboard.com',
    },
    {
        userEmail: 'mark.powel.wobo@workboard.com',
        managerEmail: 'hassan.hassani.wobo@workboard.com',
    },
    {
        userEmail: 'matt.almenu.wobo@workboard.com',
        managerEmail: 'jill.mill.wobo@workboard.com',
    },
    {
        userEmail: 'albert.lambert.wobo@workboard.com',
        managerEmail: 'matt.almenu.wobo@workboard.com',
    },
    {
        userEmail: 'virgina.hemenz.wobo@workboard.com',
        managerEmail: 'mark.powel.wobo@workboard.com',
    },
    {
        userEmail: 'rozanne.mcmillian.wobo@workboard.com',
        managerEmail: 'virgina.hemenz.wobo@workboard.com',
    },
    {
        userEmail: 'kelly.sergent.wobo@workboard.com',
        managerEmail: 'virgina.hemenz.wobo@workboard.com',
    },
    {
        userEmail: 'andrew.smith.wobo@workboard.com',
        managerEmail: 'mark.powel.wobo@workboard.com',
    },
    {
        userEmail: 'elizibath.kerby.wobo@workboard.com',
        managerEmail: 'andrew.smith.wobo@workboard.com',
    },
    {
        userEmail: 'lisa.flat.wobo@workboard.com',
        managerEmail: 'elizibath.kerby.wobo@workboard.com',
    }
]

const test_scenario_1 = {
    userEmail: "albert.lambert.wobo@workboard.com",
    newManagerEmail: "virgina.hemenz.wobo@workboard.com",
    newGroupName: "hemenz virgina (virgina.hemenz.wobo)",
    oldGroupName: "almenu matt (matt.almenu.wobo)",
}

const test_scenario_2 = {
    userEmail: "albert.lambert.wobo@workboard.com",
    newManagerEmail: "kelly.sergent.wobo@workboard.com",
    newGroupName: "sergent kelly (kelly.sergent.wobo)",
    oldGroupName: "almenu matt (matt.almenu.wobo)",
}

const test_scenario_3 = {
    userEmail: "matt.almenu.wobo@workboard.com",
    newManagerEmail: "virgina.hemenz.wobo@workboard.com",
    oldManagerEmail: "jill.mill.wobo@workboard.com",
    newGroupName: "hemenz virgina (virgina.hemenz.wobo)",
    oldGroupName: "mill jill (jill.mill.wobo)",
    userGroupName: "almenu matt (matt.almenu.wobo)"
}

const test_scenario_4 = {
    userEmail: "matt.almenu.wobo@workboard.com",
    newManagerEmail: "reddy.paramadhama.wobo@workboard.com",
    oldManagerEmail: "jill.mill.wobo@workboard.com",
    newGroupName: "paramadhama reddy (reddy.paramadhama.wobo)",
    oldGroupName: "mill jill (jill.mill.wobo)",
    userGroupName: "almenu matt (matt.almenu.wobo)"
}

const test_scenario_5 = {
    L2userEmail: "jill.mill.wobo@workboard.com",
    L2newManagerEmail: "zahra.mcbeth.wobo@workboard.com",
    L2oldManagerEmail: "jack.miranda.wobo@workboard.com",
    L2newGroupName: "mcbeth zahra (zahra.mcbeth.wobo)",
    L2userGroupName: "mill jill (jill.mill.wobo)",
    L2oldGroupName: "miranda jack (jack.miranda.wobo)",
    L3userEmail: "reddy.paramadhama.wobo@workboard.com",
    L3teammateEmail: "matt.almenu.wobo@workboard.com",
    L3userGroupName: "paramadhama reddy (reddy.paramadhama.wobo)"
}

const test_scenario_6 = {
    individualContributor: {
        userName: "albert.lambert.wobo@workboard.com",
        email: "albert.lambert.wobo@workboard.com",
        familyName: "albert",
        givenName: "lambert",
        managerEmail: "matt.almenu.wobo@workboard.com"
    },
    managerUser: {
        userName: "elizibath.kerby.wobo@workboard.com",
        email: "elizibath.kerby.wobo@workboard.com",
        familyName: "elizibath",
        givenName: "kerby",
        managerEmail: "andrew.smith.wobo@workboard.com",
        promotedManagerEmail: "andrew.smith.wobo@workboard.com",
        reportingUserEmail: "lisa.flat.wobo@workboard.com"
    }

}

const test_scenario_7 = {
    userName: "matt.almenu.wobo@workboard.com",
    email: "matt.almenu.wobo@workboard.com",
    familyName: "matt",
    givenName: "almenu",
    managerEmail: "jill.mill.wobo@workboard.com",
    promotedManagerEmail: "jill.mill.wobo@workboard.com",
    reportingUserEmail: "albert.lambert.wobo@workboard.com"
}

export { createRequestBody, dynamicTeamUsers, managerUpdateBody, managerEmployeeMap, test_scenario_1, test_scenario_2, test_scenario_3, test_scenario_4, test_scenario_5, test_scenario_6, test_scenario_7 }
