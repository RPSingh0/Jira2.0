const URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/jira`;

/**
 * This function takes jira data and creates a jira
 *
 * @param {string} token
 * @param {string} summary
 * @param {string} jiraType
 * @param {number} jiraPoint
 * @param {string} description
 * @param {number} projectKey
 * @param {number} featureKey
 * @param {number} assignedTo
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function createJiraService({token, summary, jiraType, jiraPoint, description, projectKey, featureKey, assignedTo}) {

    let data = await fetch(`${URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            summary: summary,
            jiraType: jiraType,
            description: description,
            jiraPoint: jiraPoint,
            projectKey: projectKey,
            featureKey: featureKey,
            assignedTo: assignedTo,
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}

/**
 * This function takes jira key and returns jira details
 *
 * @param {string} token
 * @param {string} jirakey
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function getJiraDetailsByJiraKeyService({token, jiraKey}) {
    let data = await fetch(`${URL}/getJiraDetailsByJiraKey/${jiraKey}`, {
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

    return data;
}

/**
 * This function takes jira key and returns jira metadata
 *
 * @param {string} token
 * @param {string} jiraKey
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function getJiraMetadataByJiraKeyService({token, jiraKey}) {
    let data = await fetch(`${URL}/getJiraMetadataByJiraKey/${jiraKey}`, {
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

    return data.data.jiraMetadata;
}

/**
 * This function takes projectKey along with featureKey and returns jira under that feature
 *
 * @param projectKey
 * @param featureKey
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function getJiraUnderFeatureService({projectKey, featureKey}) {

    let data = await fetch(`${URL}/getJira/${projectKey}/${featureKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data.data.jira;
}

/**
 * This function takes jiraKey and description and updates a jira
 *
 * @param {string} token
 * @param {string} jiraKey
 * @param {string} description
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function updateJiraDescriptionService({token, jiraKey, description}) {

    let data = await fetch(`${URL}/updateDescription`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            jiraKey: jiraKey,
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
 * This function takes jiraKey and summary and updates a jira
 *
 * @param {string} token
 * @param {string} jiraKey
 * @param {string} summary
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function updateJiraSummaryService({token, jiraKey, summary}) {

    let data = await fetch(`${URL}/updateSummary`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            jiraKey: jiraKey,
            summary: summary
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}

/**
 * This function takes jiraKey and description and updates a jira
 *
 * @param {string} token
 * @param {string} jiraKey
 * @param {number} assignedTo
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function updateJiraAssignedService({token, jiraKey, assignedTo}) {

    let data = await fetch(`${URL}/updateAssignedTo`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            jiraKey: jiraKey,
            assignedTo: assignedTo
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}

/**
 * This function takes jiraKey and jira points and updates a jira
 *
 * @param {string} token
 * @param {string} jiraKey
 * @param {number} jiraPoint
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function updateJiraPointsService({token, jiraKey, jiraPoint}) {

    let data = await fetch(`${URL}/updatePoints`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            jiraKey: jiraKey,
            jiraPoint: jiraPoint
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}

/**
 * This function updates a feature
 *
 * @param {string} token
 * @param {string} jiraKey
 * @param {string} projectKey
 * @param {number} featureKey
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function updateJiraFeatureService({token, jiraKey, projectKey, featureKey}) {

    let data = await fetch(`${URL}/updateFeature`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            jiraKey: jiraKey,
            projectKey: projectKey,
            featureKey: featureKey
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}