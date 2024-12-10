export function getProjectIfLoaded(isLoading, data, key) {

    if (key === undefined || key === null) {
        return {optionText: "Select project"};
    }

    if (isLoading) {
        return {loading: true, optionText: "Loading..."};
    }

    let value = data.filter(item => item.projectKey === key)[0];

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

    let value = data.filter(item => item.featureKey === key)[0];

    if (value === undefined) {
        return {optionText: "Select feature"};
    }

    return value;
}

export function formatDateToLocale(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

export function getSlotPropsForInput(multiline) {
    return multiline ? {
        input: {
            style: {
                padding: "0 0.5rem",
                fontSize: "1.5rem"
            }
        }
    } : {
        htmlInput: {
            style: {
                padding: "0 0.5rem",
                fontSize: "1.5rem"
            }
        }
    }
}