export const routes={
    POST: '/scim/Users',
    
    // /scim/Users/{id}
    GET_BY_ID: '/scim/Users/',
    GET_BY_USERNAME: 'scim/Users?filter=userName eq john.doe@workboard.com', 
    GET_ALL_USERS: '/scim/Users',
    GET_INVALID_ID: '/scim/Users/someID',
    GET_FILTER: 'scim/Users?filter=userName eq john.doe@workboard.com',
    GET_FILTER_EMPTY_RES: 'scim/Users?filter=userName eq some-test-user@wobodev.com',
    GET_INVALID_FILTER: 'scim/Users?filter=noName eq some-test-user@wobodev.com',
    
    // /scim/Users/{id}
    UPDATE: 'scim/Users/',
    
    // /scim/Users/{id}/
    DISABLE: 'scim/Users/',
    DISABLE_INVALID_ID: 'scim/Users/someID/',
    
    // /scim/Users/{id}
    DELETE: 'scim/Users/55',
    DELETE_INVALID_ID: 'scim/Users/someID'
}