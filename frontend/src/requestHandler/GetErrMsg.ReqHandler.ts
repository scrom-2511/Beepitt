import axios from "axios"

export const getErrMsg = async ( errMsgID: string ) => {
    try {
        const res = await axios.get(`http://localhost:3000/user/getErrMsg/${ errMsgID }`, {
            withCredentials:true
        })
        console.log(res.data.errMsg)
        return res.data.errMsg
    } catch (error) {
        console.log("There was a problem fetching the message.", error)
    }
}