import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'
import errMsgReducer from "../features/errorMsgs/errMsgsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    errMsgs: errMsgReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch