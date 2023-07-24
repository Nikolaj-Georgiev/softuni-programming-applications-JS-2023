
const host = 'http://localhost:3030';

async function request(url, options) {

    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            if (response.status === 403) {
                localStorage.removeItem('userData');
            }
            const err = await response.json();
            throw new Error(err.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}



function createOptions(method = 'GET', data) {
    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }

    return options;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('POST', data));
}

export async function put(url, data) {
    return request(url, createOptions('PUT', data));
}

export async function del(url) {
    return request(url, createOptions('DELETE'));
}

export async function login(email, password){
    const result = await post('/users/login', {email, password});

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }

    localStorage.setItem('userData', JSON.stringify(userData));
}

export async function register(email, password){
    const result = await post('/users/register', {email, password});

    const userData = {
        email: result.email,
        id: result._id,
        token: result.accessToken
    }

    localStorage.setItem('userData', JSON.stringify(userData));
}

export async function logout() {
    get('/users/logout');
    localStorage.removeItem('userData');
}