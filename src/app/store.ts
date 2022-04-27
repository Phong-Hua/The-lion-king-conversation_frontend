import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import tweetReducer from '../reducers/tweetSlice';
import userReducer from '../reducers/userSlice'
import errorReducer from '../reducers/errorSlice'
import loadingReducer from '../reducers/loadingSlice'

export const store = configureStore({
  reducer: {
    tweet: tweetReducer,
    user: userReducer,
    error: errorReducer,
    loading: loadingReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
