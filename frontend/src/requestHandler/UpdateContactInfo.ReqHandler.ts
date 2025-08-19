import axios from "axios"
import type { ResponseInterface } from "../interfaces/Response.Interfaces";

export const updateContactInfo = async(data:object): Promise<ResponseInterface> => {
    try {
        const res = await axios.post("http://localhost:3000/user/updateContactInfo",data,{
            withCredentials: true
        });
    if (res.data.success) {
        return {success:true, message:res.data.message}
    }
    return {success:false, message:res.data.message}
    } catch (error) {
    return {success:false, message:"There was an error, please try again."}
    }
}