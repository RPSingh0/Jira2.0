const USER_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`;

/**
 * Takes in email and password and logs in user with endpoint /login
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<*>}
 * @throws {Error} Error if login is unsuccessful
 */
export async function loginUserService({email, password}) {

    let data = await fetch(`${USER_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}

/**
 * Takes token and validates it
 *
 * @param {string} token
 * @returns {Promise<*>}
 * @throws {Error} Error if token is invalid
 */
export async function authenticateUserWithTokenService({token}) {
    let data = await fetch(`${USER_URL}/validateToken`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (data.status !== 204) {
        data = await data.json();
        throw new Error(data.message);
    }
}

/**
 * Get all users in system
 *
 * @param {string} token
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if unable to fetch or if token is invalid
 */
export async function getAllUsersService({token}) {
    let data = await fetch(`${USER_URL}/getAllUsers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data.data.users;
}

/**
 * Get jira current user worked on
 *
 * @param {string} token
 * @param {string} type
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if unable to fetch or if token is invalid
 */
export async function getJiraCurrentUserWorkedOnService({token, type}) {

    const url = new URL(`${USER_URL}/workedOn`);

    // conditionally adding the type query parameter
    if (type) {
        url.searchParams.append('type', type);
    }

    console.log(type);

    let data = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data.data.jira;
}