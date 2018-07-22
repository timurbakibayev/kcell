import {URL} from './url'

export const loadSettings = (token) => {
    return fetch(
        `${URL}api/settings/`,
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

export const saveSettings = async (setting, value, token) => {
    return fetch(
                `${URL}api/settings/`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${ token }`
                    },
                    body: JSON.stringify({value: value, setting_name: setting})
                });
};
