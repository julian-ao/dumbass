import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'

// Check if user is logged in from local storage
const savedUsername = localStorage.getItem('username')
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

/**
 * Redux store configuration.
 *
 * Configures and creates the Redux store for the application. The store uses Redux Toolkit's `configureStore` method.
 * It includes the `userReducer` to manage the state related to user authentication and information.
 * The store's initial state is preloaded with the user's login status and username, derived from the local storage.
 * This enables persisting the user's authentication state across page reloads.
 *
 * The `RootState` type is also defined here, representing the state structure of the entire Redux store, 
 * which can be used throughout the application for type checking with Redux's `useSelector` hook.
 *
 * @returns {Object} The configured Redux store.
 */
const store = configureStore({
    reducer: {
        user: userReducer
    },
    preloadedState: {
        user: {
            loggedIn: isLoggedIn,
            username: savedUsername || null
        }
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store
