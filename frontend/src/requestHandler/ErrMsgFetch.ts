import axios from "axios"
import type { ErrMsgInterface } from "../interfaces/ErrMsg.Interface"

export const errMsgFetch = async():(Promise<ErrMsgInterface[]|string>) => {
    try {
        const res = await axios.get("http://localhost:3000/user/errMsgFetch")
        if(res.data.success) return res.data.errMsgs as ErrMsgInterface[]
        else return res.data.message as string
    } catch (error) {
        return "There was an error fetching the err messages, please try reload the page."
    }
}