// place files you want to import through the `$lib` alias in this folder.

import { PUBLIC_API_BASE_URL } from '$env/static/public';

export async function post(endpoint, data = {}) {
    data.token = localStorage.getItem('token');
    return fetch(PUBLIC_API_BASE_URL + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}