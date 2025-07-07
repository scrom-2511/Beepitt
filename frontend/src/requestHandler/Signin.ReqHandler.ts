import axios from "axios"
import type { ResponseInterface } from "../interfaces/Response.Interfaces";

export interface SigninInterface extends ResponseInterface{
    username:string;
}

export const signinHandler = async (data: object): Promise<SigninInterface | ResponseInterface> => {
    try {
        const res = await axios.post("http://localhost:3000/user/signin", data, {
            withCredentials: true
        });
        if (res.data.success) {
            return { success: true, message: res.data.message, username: res.data.username }
        }
        return { success: false, message: res.data.message }
    } catch (err) {
        return { success: false, message: "There was an error, please try again.",  }
    }
}