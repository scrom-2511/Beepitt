import axios from "axios"

export const aiRecommendation = async( errMsgID: string ) => {
    try {
        const res = await axios.get(`http://localhost:3000/user/aiRecommendation/${ errMsgID }`, {
            withCredentials:true
        })
        console.log(res.data.aiResponse)
        return res.data.aiResponse
    } catch (error) {
        console.log("There was a problem fetching the message.", error)
    }
}