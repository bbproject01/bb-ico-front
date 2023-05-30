// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import tokenSlice from './TokenBNB';
import dashboardSlice from './Dashboard';

const store = configureStore({
  reducer: {
    tokenBNB: tokenSlice,
    dashboard: dashboardSlice
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type Dispatch = typeof store.dispatch;

export default store;
export type Thunk = ThunkAction<
  Promise<unknown>,
  RootState,
  unknown,
  Action<unknown>
>;
