import axios from "axios"
import type { ResponseInterface } from "../interfaces/ResponseInterfaces";

export const signupHandler = async (data: object): Promise<ResponseInterface> => {
    try {
        const res = await axios.post("http://localhost:3000/user/signup", data);
        if (res.data.success) {
            return { success: true, message: res.data.message }
        }
        return { success: false, message: res.data.messages }
    } catch (err) {
        return { success: false, message: "There was an error, please try again." }
    }
}