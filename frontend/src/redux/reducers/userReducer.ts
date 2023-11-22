import { createReducer, PayloadAction } from '@reduxjs/toolkit'
import {
    setUserLogin,
    setUserLogout,
    setUserName
} from '../actions/userActions'

interface UserState {
    loggedIn: boolean
    username: string | null
}

const initialState: UserState = {
    loggedIn: false,
    username: null
}

/**
 * Redux reducer: `userReducer`.
 *
 * This reducer manages the state related to the user in the application. It handles user login status 
 * and the username. The state shape includes `loggedIn`, indicating if the user is logged in or not, 
 * and `username`, storing the name of the logged-in user.
 *
 * @param {Object} state - The current state of the user.
 * @param {Object} action - The action dispatched to the reducer.
 * @returns {Object} The updated user state.
 */
const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUserLogin, (state: UserState) => {
            state.loggedIn = true
        })
        .addCase(setUserLogout, (state: UserState) => {
            state.loggedIn = false
            state.username = null // Nullify username
        })
        .addCase(
            setUserName,
            (state: UserState, action: PayloadAction<string>) => {
                state.username = action.payload // Set username
            }
        )
})

export default userReducer
