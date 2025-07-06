import axios from "axios";

export const otpValidator = async(data:object) => {
    try {
        const res = await axios.post("http://localhost:3000/user/otpValidator",data);
    if (res.data.success) {
        return {success:true, message:res.data.message}
    }
    return {success:false, message:res.data.message}
    } catch (error) {
    return {success:false, message:"There was an error, please try again."}
    }
}