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