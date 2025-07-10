import axios from "axios"

export const isLoggedIn = async()=> {
    try {
        const res = await axios.get("http://localhost:3000/user/isLoggedIn",{
            withCredentials: true
        })
        console.log(res.data.success)
        return res.data.success
    } catch (error) {
        return false
    }
}