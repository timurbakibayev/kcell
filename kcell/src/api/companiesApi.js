import { URL } from './url'
export const loadCompanies = (token) => {
    return fetch(
        `${URL}api/companies/`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ token }`
            }
        }
    )
};

export const newCompany = (companyName, token) => {
    return fetch(
        `${URL}api/companies/`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ token }`
            },
            body: JSON.stringify({
                company_name: companyName
            })
        }
    )
};