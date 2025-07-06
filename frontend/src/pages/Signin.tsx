import { useDispatch, useSelector } from "react-redux"
import NavigationBar from "../components/NavigationBar"
import { selectAuth, setEmail, setPassword } from "../features/auth/authSlice"
import React, { useState } from "react"
import { signinHandler } from "../requestHandler/Signin.ReqHandler"
import { useNavigate } from "react-router-dom"
import { setUsername } from "../features/user/userSlice"

const Signin = () => {

    return (
        <div className="h-full w-full ">
            <NavigationBar position="static" />
            <SigninComponent />
        </div>
    )
}

const SigninComponent = () => {
    const [errMsg, setErrMsg] = useState<{ visible: boolean, message: string }>({ visible: false, message: "" });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { email, password } = useSelector(selectAuth);
    const data = { email, password };
    const handleOnClickBtn = async () => {
        const resData = await signinHandler(data);
        const { success, message } = resData
        if (success && "username" in resData) {
            setUsername(resData.username)
            navigate("/dashboard")
        } else setErrMsg({ visible: true, message: message })
    }
    return (
        <div className="h-[600px] w-[500px] bg-third rounded-2xl absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
            <div className="h-[70px] w-[70px] bg-secondary rounded-full blur-[90px] absolute top-20 left-1/2 transform -translate-x-1/2"></div>
            <div className="h-full px-20 py-15 text-secondary flex flex-col items-center">
                <h1 className="font-roboto font-extrabold text-2xl text-center text-secondary mb-8">WELCOME</h1>
                <div className="h-10 w-full border border-secondary rounded-[10px] mb-8 p-5 flex items-center gap-5">
                    <img src="/images/google-logo.png" alt="" className="h-5" />
                    <button className="font-roboto font-extrabold text-sm">CONNECT WITH GOOGLE</button>
                </div>
                <div className="h-10 w-full border border-secondary rounded-[10px] mb-8 p-5 flex items-center gap-5">
                    <img src="/images/github-logo.png" alt="" className="h-5" />
                    <button className="font-roboto font-extrabold text-sm">CONNECT WITH GITHUB</button>
                </div>
                <div className="w-full flex justify-center items-center gap-5 mb-8">
                    <div className="w-30 h-[1px] bg-secondary"></div>
                    <h3 className="font-roboto font-extrabold text-sm">OR</h3>
                    <div className="w-30 h-[1px] bg-secondary"></div>
                </div>
                <input type="text" placeholder="Enter your email" className="font-roboto font-light text-sm h-10 w-full border border-secondary rounded-[10px] mb-8 p-5" onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setEmail(e.target.value))} />
                <input type="text" placeholder="Enter your password" className="font-roboto font-light text-sm h-10 w-full border border-secondary rounded-[10px] mb-6 p-5" onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setPassword(e.target.value))} />
                <p className="font-roboto font-light text-sm text-center mb-6 text-red-600" style={errMsg.visible === true ? { visibility: "visible" } : { visibility: "hidden" }}>{"Err:" + errMsg.message}</p>
                <button className="h-7 w-30 bg-gradient-to-b from-white to-[#9A9A9A] rounded-[7px] font-roboto font-extrabold text-[12px] main-btn text-third" onClick={handleOnClickBtn} >SIGNIN</button>
            </div>
        </div>
    )
}

export default Signin