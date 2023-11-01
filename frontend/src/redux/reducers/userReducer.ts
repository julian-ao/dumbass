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

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUserLogin, (state: UserState) => {
            state.loggedIn = true
        })
        .addCase(setUserLogout, (state: UserState) => {
            state.loggedIn = false
            state.username = null // Nullify username
        })
        .addCase(setUserName, (state: UserState, action: PayloadAction<string>) => {
            state.username = action.payload // Set username
        })
})

export default userReducer
