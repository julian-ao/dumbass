// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        // Add more reducers here
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
