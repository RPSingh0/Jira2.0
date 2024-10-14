export function getProjectIfLoaded(isLoading, data, key) {

    if (key === undefined || key === null) {
        return {optionText: "Select project"};
    }

    if (isLoading) {
        return {loading: true, optionText: "Loading..."};
    }

    let value = data.data.projects.filter(item => item.projectKey === key.toUpperCase())[0];

    if (value === undefined) {
        return {optionText: "Select project"};
    }

    return value;
}

export function getFeatureIfLoaded(isLoading, data, key) {

    if (key === undefined || key === null) {
        return {optionText: "Select feature"};
    }

    if (isLoading) {
        return {loading: true, optionText: "Loading..."};
    }

    let value = data.data.features.filter(item => item.featureKey === key.toUpperCase())[0];

    if (value === undefined) {
        console.log('here')
        return {optionText: "Select feature"};
    }

    return value;
}