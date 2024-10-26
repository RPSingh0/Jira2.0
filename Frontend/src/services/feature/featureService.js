const URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/feature`;

/**
 * This function takes feature data and creates a feature
 *
 * @param {string} name
 * @param {string} featureKey
 * @param {string} description
 * @param {number} projectId
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function createFeatureService({name, featureKey, description, projectId}) {

    let data = await fetch(`${URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            featureKey: featureKey,
            description: description,
            projectId: projectId
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}

/**
 * This function takes project id and returns a feature key
 *
 * @param name
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function getFeatureKeyService({id}) {

    let data = await fetch(`${URL}/getFeatureKey`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}

/**
 * This function takes projectKey along with featureKey and returns a feature detail
 *
 * @param projectKey
 * @param featureKey
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function getFeatureDetailService({projectKey, featureKey}) {

    let data = await fetch(`${URL}/getFeature/${projectKey}/${featureKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data.data.feature;
}

/**
 * This function takes project key and returns all features
 *
 * @param projectKey
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function getAllFeaturesByProjectKey({projectKey}) {

    let data = await fetch(`${URL}/getAllFeaturesByProjectKey/${projectKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}

/**
 * This function takes project key and returns all features as options
 *
 * @param projectKey
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function getFeaturesAsOptionsByProjectKey({projectKey}) {

    let data = await fetch(`${URL}/getFeaturesAsOptionsByProjectKey/${projectKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data.data.features;
}

/**
 * This function updates a feature's description
 *
 * @param {string} token
 * @param {string} projectKey
 * @param {string} featureKey
 * @param {string} description
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function updateFeatureDescriptionService({token, projectKey, featureKey, description}) {

    let data = await fetch(`${URL}/updateDescription`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            projectKey: projectKey,
            featureKey: featureKey,
            description: description
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}

/**
 * This function updates a feature's name
 *
 * @param {string} token
 * @param {string} projectKey
 * @param {string} featureKey
 * @param {string} name
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function updateFeatureNameService({token, projectKey, featureKey, name}) {

    let data = await fetch(`${URL}/updateName`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            projectKey: projectKey,
            featureKey: featureKey,
            name: name
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}