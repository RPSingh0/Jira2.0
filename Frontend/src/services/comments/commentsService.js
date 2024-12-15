import store from "../../store.js";

const COMMENT_URL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/comment`;

export async function getProjectComments({token, projectKey}) {

    const url = new URL(`${COMMENT_URL}/project/get/${projectKey}`);

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

    return data.data.comments;
}

export async function createProjectCommentService({projectKey, content}) {

    const url = new URL(`${COMMENT_URL}/project/create`);

    const token = store.getState()?.authentication?.token;

    let data = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            projectKey: projectKey,
            content: content
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}

export async function getFeatureComments({projectKey, featureKey}) {

    const url = new URL(`${COMMENT_URL}/feature/get/${projectKey}/${featureKey}`);
    const token = store.getState()?.authentication?.token;

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

    return data.data.comments;
}

export async function createFeatureCommentService({projectKey, featureKey, content}) {

    const url = new URL(`${COMMENT_URL}/feature/create`);

    const token = store.getState()?.authentication?.token;

    let data = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            projectKey: projectKey,
            featureKey: featureKey,
            content: content
        })
    });

    data = await data.json();

    if (data && data.status === 'fail') {
        throw new Error(data.message);
    }

    return data;
}