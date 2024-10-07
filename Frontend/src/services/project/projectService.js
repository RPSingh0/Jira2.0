const URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/project`;

/**
 * This function takes project data and creates a project
 *
 * @param {string} name
 * @param {string} projectKey
 * @param {string} description
 * @param {number} projectLeadBy
 * @param {string} startDate
 * @param {string} expectedEndDate
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function createProjectService({name, projectKey, description, projectLeadBy, startDate, expectedEndDate}) {

    let data = await fetch(`${URL}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            projectKey: projectKey,
            description: description,
            projectLeadBy: projectLeadBy,
            startDate: startDate,
            expectedEndDate: expectedEndDate
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}

/**
 * This function takes project name and returns a project key
 *
 * @param name
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function getProjectKeyService({name}) {

    let data = await fetch(`${URL}/getProjectKey`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}