import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import interfaceSlice from '../slices/interface/interfaceSlice';
import sessionSlice from '../slices/session/sessionSlice';
import usersSlice from '../slices/users/usersSlice';

const middleware = [...getDefaultMiddleware({serializableCheck: false}), logger];

export const store = configureStore({
  reducer: {
    interface: interfaceSlice,
    session: sessionSlice,
    users: usersSlice,
  },
  middleware,
  devTools: true,
});
