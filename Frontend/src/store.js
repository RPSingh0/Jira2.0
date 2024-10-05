import {configureStore} from "@reduxjs/toolkit";
import authenticationReducer from './services/user/authenticationSlice.js';
import {loadState, saveState} from "./utils/localStorage.js";

const preloadedState = {
    'authentication': loadState('authentication')
};

const store = configureStore({
    reducer: {
        'authentication': authenticationReducer
    },
    preloadedState: preloadedState
});

store.subscribe(() => {
    saveState('authentication', store.getState().authentication);
});

export default store;