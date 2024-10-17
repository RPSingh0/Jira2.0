const URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/jira`;

/**
 * This function takes jira data and creates a jira
 *
 * @param {string} token
 * @param {string} summary
 * @param {string} jiraType
 * @param {string} description
 * @param {number} projectId
 * @param {number} featureId
 * @param {number} assignedTo
 *
 * @returns {Promise<*>}
 *
 * @throws {Error} Error if api call is unsuccessful
 */
export async function createJiraService({token, summary, jiraType, description, projectId, featureId, assignedTo}) {

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
            projectId: projectId,
            featureId: featureId,
            assignedTo: assignedTo,
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}