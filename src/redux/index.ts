import {combineReducers, configureStore} from '@reduxjs/toolkit';
import onlineSlice from './store';
import {airportsAPI} from './servises';

const rootReducer = combineReducers({
  online: onlineSlice,
  [airportsAPI.reducerPath]: airportsAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(airportsAPI.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
