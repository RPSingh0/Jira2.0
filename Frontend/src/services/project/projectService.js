const PROJECT_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/project`;

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

    let data = await fetch(`${PROJECT_URL}/create`, {
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
export async function generateProjectKeyService({name}) {

    let data = await fetch(`${PROJECT_URL}/generateProjectKey`, {
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

    return data.data;
}

/**
 * Get all projects in system
 *
 * @param {string} token
 * @param {string} search
 * @param {string} page
 * @param {string} pageSize
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if unable to fetch or if token is invalid
 */
export async function getAllProjectsService({token, search, page, pageSize}) {

    const url = new URL(`${PROJECT_URL}/getAllProjects`);

    if (search) {
        url.searchParams.append('search', search);
    }

    if (page) {
        url.searchParams.append('page', page);
    }

    if (pageSize) {
        url.searchParams.append('pageSize', pageSize);
    }

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

    return data.data;
}

/**
 * Get all projects in system as dropdown options
 *
 * @param {string} token
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if unable to fetch or if token is invalid
 */
export async function getAllProjectsAsOptionsService({token}) {
    let data = await fetch(`${PROJECT_URL}/getAllProjectsAsOptions`, {
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

    return data.data.projects;
}

/**
 * This function takes projectKey and returns a project detail
 *
 * @param projectKey
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function getProjectDetailService({projectKey}) {

    let data = await fetch(`${PROJECT_URL}/getProject/${projectKey}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data.data.project;
}

/**
 * This function updates a project's description
 *
 * @param {string} token
 * @param {string} projectKey
 * @param {string} description
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function updateProjectDescriptionService({token, projectKey, description}) {

    let data = await fetch(`${PROJECT_URL}/updateDescription`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            projectKey: projectKey,
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
 * This function takes a project key and an email and updated project lead to passed email user
 *
 * @param {string} token
 * @param {string} projectKey
 * @param {string} leadBy
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function updateProjectLeadByService({token, projectKey, leadBy}) {

    let data = await fetch(`${PROJECT_URL}/updateLeadBy`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            projectKey: projectKey,
            leadBy: leadBy
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}