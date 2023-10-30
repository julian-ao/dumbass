import { createReducer } from '@reduxjs/toolkit';
import { setUserLogin, setUserLogout } from '../actions/userActions';

interface UserState {
    loggedIn: boolean;
}

const initialState: UserState = {
    loggedIn: false,
};

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUserLogin, (state) => {
            state.loggedIn = true;
        })
        .addCase(setUserLogout, (state) => {
            state.loggedIn = false;
        });
});

export default userReducer;
