export const loadState = (key) => {
    try {
        const serializedState = localStorage.getItem(key);

        if (serializedState === null) {
            return {};
        }

        return JSON.parse(serializedState);
    } catch (error) {
        return null;
    }
}

export const saveState = (key, value) => {
    try {
        const stringifiedState = JSON.stringify(value);
        localStorage.setItem(key, stringifiedState);
    } catch (error) {
        console.log('Unable to save!');
    }
}