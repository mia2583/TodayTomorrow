import {configureStore} from '@reduxjs/toolkit';
import userAuthSlice from './slice/UserAuthSlice';

export const store = configureStore({
  reducer: {
    userAuth: userAuthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
