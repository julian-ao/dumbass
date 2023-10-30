import { createReducer } from '@reduxjs/toolkit';
import { setUserLogin, setUserLogout, setUserName } from '../actions/userActions';

interface UserState {
    loggedIn: boolean;
    username: string | null;
}

const initialState: UserState = {
    loggedIn: false,
    username: null,
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUserLogin, (state) => {
            state.loggedIn = true;
        })
        .addCase(setUserLogout, (state) => {
            state.loggedIn = false;
            state.username = null; // Nullify username
        })
        .addCase(setUserName, (state, action) => {
            state.username = action.payload; // Set username
        });
});

export default userReducer;
