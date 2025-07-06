import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { emailsContactInterface, phoneNumsContactInterface } from "../../interfaces/UserContacts.Interface";

interface finalContacts{
    emails: emailsContactInterface;
    phoneNums: phoneNumsContactInterface
}

const initialState : finalContacts = {
    emails: {primary:"", secondary:"", tertiary:""},
    phoneNums: {primary:"", secondary:"", tertiary:""}
}

export const userContactSlice = createSlice({
    name:"contact",
    initialState,
    reducers: {
        setEmailsContact:(state, action:PayloadAction<emailsContactInterface>) => {
            state.emails = action.payload
        },
        setPhoneNumsContact:(state, action:PayloadAction<phoneNumsContactInterface>) => {
            state.phoneNums = action.payload
        }
    }
})

export const {setEmailsContact, setPhoneNumsContact} = userContactSlice.actions

export const selectUserContact = (state: RootState) => state.userContact

export default userContactSlice.reducer