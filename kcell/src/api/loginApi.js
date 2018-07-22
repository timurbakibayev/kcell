import {URL} from './url'
export function loginUser(creds) {
    return fetch(
        `${URL}api/authwithrole/`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:creds.username,
                password:creds.password})
        }
    )
}

export function userDetail(creds, token) {
    return fetch(
        `${URL}api/user_by_name/${creds.username}/`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ token }`
            }
        }
    )
}