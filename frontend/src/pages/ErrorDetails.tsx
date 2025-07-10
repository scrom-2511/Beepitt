import { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar"
import type { ErrMsg } from "../interfaces/ErrMsg.Interface";
import { getErrMsg } from "../requestHandler/GetErrMsg.ReqHandler";

const ErrorDetails = () => {
  const errMsgID = window.location.href.split("errDetails/")[1];
  const [errMsg, setErrMsg] = useState< ErrMsg|null >(null)

  useEffect(()=>{
    console.log(errMsgID)
    const handleOnLoad = async() => {
      const errMsgRes = await getErrMsg( errMsgID );
      setErrMsg(errMsgRes)
    }
    handleOnLoad()
  }, [])

  if( !errMsg ){
    return(
      <p>LOADING ERROR MESSAGE</p>
    )
  }
  
  const detailsArr = [
    { key: "ERR NAME:", value: errMsg.errMsgObj.errName },
    { key: "ERROR MESSAGE:", value: errMsg.errMsgObj.errMsg },
    { key: "ERROR STACK:", value: errMsg.errMsgObj.errStack },
    { key: "FILE PATH:", value: errMsg.filePath },
    { key: "ERROR DATE AND TIME:", value: new Date(errMsg.createdAt).toLocaleString() }
  ];

  return (
    <div className="h-full w-full">
      <NavigationBar position="static" />
      <div className="h-[calc(100%-100px)] w-full relative">
        <div className="h-full w-full ml-30">
          <h1 className="font-mainheading font-extrabold bg-gradient-to-b from-white to-[#9A9A9A] bg-clip-text text-transparent text-4xl">ERROR - {errMsgID}</h1>
          <div className="h-[calc(100%-100px)] w-full overflow-y-scroll mt-10 text-fourth">
              {detailsArr.map((element, index)=> (
                <div key={index} className="mb-10">
                  <h3 className="font-bold">{element.key}</h3>
                  {<pre className="mt-2 whitespace-pre-wrap break-words">{element.value}</pre>}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorDetails