export const routes={
    POST: '/scim/Users',
    
    GET: '/scim/Users/1',
    GET_ALL_USERS: '/scim/Users',
    GET_INVALID_ID: '/scim/Users/abc',
    GET_FILTER: 'scim/Users?filter=userName eq wobo-employee1@wobodev.com',
    GET_FILTER_EMPTY_RES: 'scim/Users?filter=userName eq wobo-employee60@wobodev.com',
    GET_INVALID_FILTER: 'scim/Users?filter=noName eq wobo-employee60@wobodev.com',
    
    UPDATE: 'scim/Users/9/',
    
    DISABLE: 'scim/Users/9/',
    DISABLE_INVALID_ID: 'scim/Users/89/',
    
    DELETE: 'scim/Users/51/',
}