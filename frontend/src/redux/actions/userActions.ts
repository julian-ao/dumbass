import { createAction } from '@reduxjs/toolkit'

// Action for user login
export const setUserLogin = createAction<void>('user/setUserLogin')

// Action for user logout
export const setUserLogout = createAction<void>('user/setUserLogout')

// Action for setting user name
export const setUserName = createAction<string>('user/setUserName')
