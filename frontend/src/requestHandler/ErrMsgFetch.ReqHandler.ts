import axios from "axios"
import type { ErrMsg } from "../interfaces/ErrMsg.Interface"

export const errMsgFetch = async():(Promise<ErrMsg[]|string>) => {
    try {
        const res = await axios.get("http://localhost:3000/user/errMsgsFetch", {
            withCredentials: true
        })
        if(res.data.success) return res.data.errMsgs as ErrMsg[]
        else return res.data.message as string
    } catch (error) {
        return "There was an error fetching the err messages, please try reload the page."
    }
}