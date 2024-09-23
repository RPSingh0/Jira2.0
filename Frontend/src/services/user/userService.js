const URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/user`;

/**
 * Takes in email and password and logs in user with endpoint /login
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<*>}
 * @throws {Error} Error if login is unsuccessful
 */
export async function loginUserService({email, password}) {
    let data = await fetch(`${URL}/login`, {
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