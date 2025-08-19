import axios from "axios"

export const settingsFetch = async () => {
    try {
        const res = await axios.get(`http://localhost:3000/user/settingsFetch`, {
            withCredentials:true
        })
        console.log(res.data.errMsg)
        return res.data
    } catch (error) {
        console.log("There was a problem fetching the message.", error)
    }
}