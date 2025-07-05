import { useDispatch } from "react-redux"
import NavigationBar from "../components/NavigationBar"
import { setEmail, setPassword } from "../features/auth/authSlice"
import React, { useState } from "react"
import { useAuth } from "../stateExport/stateExport"
import { signupHandler } from "../requestHandler/signup"
import { useNavigate } from "react-router-dom"
import { usernameUpdate } from "../requestHandler/UsernameUpdate"

const Signup = () => {
  const [signUpComponentVisibility, setSignUpComponentVisibility] = useState<boolean>(true);

  return (
    <div className="h-full w-full ">
      <NavigationBar position="static" />
      {signUpComponentVisibility === true ? <SignupComponent setSignUpComponentVisibility={setSignUpComponentVisibility} /> : <UsernameUpdateComponent  />}
    </div>
  )
}

const SignupComponent = ({ setSignUpComponentVisibility }: { setSignUpComponentVisibility: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [errMsg, setErrMsg] = useState<{visible:boolean, message:string}>({visible:false, message:""});
  const dispatch = useDispatch();
  const data = { ...useAuth() };
  const handleOnClickBtn = async () => {
    const {success, message} = await signupHandler(data);
    if (success) setSignUpComponentVisibility(false);
    else setErrMsg({visible:true, message:message})
  }
  return (
    <div className="h-[600px] w-[500px] bg-third rounded-2xl absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
      <div className="h-[70px] w-[70px] bg-secondary rounded-full blur-[90px] absolute top-20 left-1/2 transform -translate-x-1/2"></div>
      <div className="h-full px-20 py-15 text-secondary flex flex-col items-center">
        <h1 className="font-roboto font-extrabold text-2xl text-center text-secondary mb-8">WELCOME</h1>
        <div className="h-10 w-auto border border-secondary rounded-[10px] flex items-center gap-4 p-3 mb-8">
          <img src="/images/google-logo.png" alt="" className="h-5" />
          <button className="font-roboto font-extrabold text-sm">CONNECT WITH GOOGLE</button>
        </div>
        <div className="h-10 w-auto border border-secondary rounded-[10px] flex items-center gap-4 p-3 mb-8">
          <img src="/images/github-logo.png" alt="" className="h-5" />
          <button className="font-roboto font-extrabold text-sm">CONNECT WITH GITHUB</button>
        </div>
        <div className="w-full flex justify-center items-center gap-5 mb-8">
          <div className="w-30 h-[1px] bg-secondary"></div>
          <h3 className="font-roboto font-extrabold text-sm">OR</h3>
          <div className="w-30 h-[1px] bg-secondary"></div>
        </div>
        <input type="text" placeholder="Enter your password" className="font-roboto font-light text-sm h-10 w-full border border-secondary rounded-[10px] mb-8 p-5" onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setEmail(e.target.value))} />
        <input type="text" placeholder="Enter your password" className="font-roboto font-light text-sm h-10 w-full border border-secondary rounded-[10px] mb-8 p-5" onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setPassword(e.target.value))} />
        <h1 className="font-roboto font-extrabold text-2xl text-center text-secondary mb-8">hey</h1>
        <button className="h-7 w-30 bg-gradient-to-b from-white to-[#9A9A9A] rounded-[7px] font-roboto font-extrabold text-[12px] main-btn text-third" onClick={handleOnClickBtn} >SIGNUP</button>
      </div>
    </div>
  )
}

const UsernameUpdateComponent = () => {
  const [errMsg, setErrMsg] = useState<boolean>(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const handleOnClickBtn = async ()=>{
    const {success, message} = await usernameUpdate({username})
    if (success) navigate("/dashboard");
    else setErrMsg(true)
  }
  return (
    <div className="h-[250px] w-[500px] bg-third rounded-2xl absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
      <div className="h-[70px] w-[70px] bg-secondary rounded-full blur-[90px] absolute top-20 left-1/2 transform -translate-x-1/2"></div>
      <div className="h-full px-20 py-5 text-secondary flex flex-col justify-center items-center gap-7">
        <h1 className="font-roboto font-light text-lg text-secondary">What shall we call you?</h1>
        <input type="text" placeholder="Enter your username" className="font-roboto font-light text-sm h-10 w-full border border-secondary rounded-[10px] p-5" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
        <button className="h-8 w-30 bg-gradient-to-b from-white to-[#9A9A9A] rounded-[7px] font-roboto font-extrabold text-[12px] main-btn text-third mt-2" onClick={handleOnClickBtn}>Let's Go!</button>
      </div>
    </div>
  )
}

export default Signup