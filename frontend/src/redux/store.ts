// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

// Check if user is logged in from local storage
const savedUsername = localStorage.getItem('username');
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

const store = configureStore({
    reducer: {
        user: userReducer,
        // Add more reducers here
    },
    preloadedState: {
        user: {
            loggedIn: isLoggedIn,
            username: savedUsername || null,
        },
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
