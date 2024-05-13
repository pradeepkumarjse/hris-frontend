import { configureStore } from '@reduxjs/toolkit';



import currentUserReducer from './slices/currentUserSlice';
import authReducer from './slices/authSlice';


const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    auth: authReducer,
    },
});

export default store;
