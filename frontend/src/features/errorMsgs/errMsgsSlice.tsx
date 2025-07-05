import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

interface ErrMsg{
    id:string;
    errName:string;
    time:string;
    solved:boolean;
}

interface ErrMsgsState{
    messages: ErrMsg[]
}

const initialState: ErrMsgsState = {
    messages : [{id:"", errName:"", time:"", solved:false},]
}

export const ErrMsgsSlice = createSlice({
    name:"errMsgs",
    initialState,
    reducers:{
        setErrMsgs: (state, action:PayloadAction<ErrMsg[]>) => {
            state.messages = action.payload
        },
        addErrMsgs: (state, action:PayloadAction<ErrMsg>) => {
            state.messages.push(action.payload)
        }
    }
})

export const {setErrMsgs, addErrMsgs} = ErrMsgsSlice.actions

export const selectErrMsgs = (state:RootState) => state.errMsgs.messages

export default ErrMsgsSlice.reducer