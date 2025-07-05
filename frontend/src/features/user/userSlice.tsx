import  { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface UserState {
  username: string
}

const initialState: UserState = {
  username: "",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action:PayloadAction<string>) =>{
        state.username = action.payload
    }
  },
})

export const { setUsername } = userSlice.actions

export const selectUser = (state: RootState) => state.user.username

export default userSlice.reducer