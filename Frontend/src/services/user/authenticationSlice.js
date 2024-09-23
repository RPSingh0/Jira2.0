import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null
};

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.token = null;
            state.isLoggedIn = false;
        }
    }
});

export const getAuthToken = state => state.authentication.token;
export const isLoggedIn = state => state.authentication.isLoggedIn;

export const {login, logout} = authenticationSlice.actions;
export default authenticationSlice.reducer;