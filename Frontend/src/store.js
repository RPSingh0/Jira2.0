import {configureStore} from "@reduxjs/toolkit";
import authenticationReducer from './services/user/authenticationSlice.js';

const store = configureStore({
    reducer: {
        'authentication': authenticationReducer
    }
});

export default store;