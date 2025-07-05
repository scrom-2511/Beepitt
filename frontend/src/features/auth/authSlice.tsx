import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface AuthState{
  email:string;
  password:string;
}

const initialState:AuthState = {
  email : "",
  password: ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail : (state, action: PayloadAction<string>) =>{
      state.email = action.payload
    },
    setPassword : (state, action: PayloadAction<string>) => {
      state.password = action.payload
    }
  },
})

export const {setEmail, setPassword} = authSlice.actions

export const selectAuth = (state:RootState) => state.auth

export default authSlice.reducer