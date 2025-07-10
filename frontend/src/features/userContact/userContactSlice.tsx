import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { EmailsContactInterface, FinalContacts, PhoneNumsContactInterface } from "../../interfaces/UserContacts.Interface";



const initialState: FinalContacts = {
    emails: {primary:"", secondary:"", tertiary:""},
    phoneNums: {primary:"", secondary:"", tertiary:""}
}

export const userContactSlice = createSlice({
    name:"contact",
    initialState,
    reducers: {
        setEmailsContact:(state, action:PayloadAction<EmailsContactInterface>) => {
            state.emails = action.payload
        },
        setPhoneNumsContact:(state, action:PayloadAction<PhoneNumsContactInterface>) => {
            state.phoneNums = action.payload
        }
    }
})

export const {setEmailsContact, setPhoneNumsContact} = userContactSlice.actions

export const selectUserContact = (state: RootState) => state.userContact

export default userContactSlice.reducer