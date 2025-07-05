import axios from "axios"
import type { ResponseInterface } from "../interfaces/ResponseInterfaces";

export const usernameUpdate = async(data:object): Promise<ResponseInterface> => {
    const res = await axios.post("http://localhost:3000/user/usernameUpdate",data);
    if (res.data.success) {
        return {success:true, message:res.data.message}
    }
    return {success:false, message:res.data.message}
}