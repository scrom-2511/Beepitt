import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar"
import { getErrMsg } from "../requestHandler/GetErrMsg.ReqHandler";
import type { ErrMsg } from "../interfaces/ErrMsg.Interface";
import { useParams } from "react-router-dom";
import { aiRecommendation } from "../requestHandler/AiRecommendation.ReqHandler";

const ErrorDetails = () => {
  const { errMsgID } = useParams();

  const [errMsg, setErrMsg] = useState<ErrMsg | null>(null)
  const [showMsg, setShowMsg] = useState<boolean>(false)
  const [aiMsg, setAiMsg] = useState<string>("Generate")

  useEffect(() => {
    console.log(errMsgID)
    const handleOnLoad = async () => {
      const errMsgRes = await getErrMsg(errMsgID as string);
      setErrMsg(errMsgRes)
      if(errMsgRes.aiRecommendation !== "") setAiMsg(errMsgRes.aiRecommendation)
    }
    handleOnLoad()
  }, [])

  if (!errMsg) {
    return (
      <p>LOADING ERROR MESSAGE</p>
    )
  }

  const detailsArr = [
    { key: "ERR NAME:", value: errMsg.errMsgObj?.errName },
    { key: "ERROR MESSAGE:", value: errMsg.errMsgObj?.errMsg },
    { key: "ERROR STACK:", value: errMsg.errMsgObj?.errStack },
    { key: "FILE PATH:", value: errMsg.filePath },
    { key: "ERROR DATE AND TIME:", value: new Date(errMsg.createdAt).toLocaleString() }
  ];


  return (
    <div className="h-full w-full">
      <NavigationBar position="static" />
      <WarningMsg showMsg={showMsg} setShowMsg={setShowMsg} setAiMsg={setAiMsg} />
      <div className="h-[calc(100%-100px)] w-full relative z-10" style={{ opacity: showMsg ? "20%" : "100%", pointerEvents: showMsg ? "none" : "auto", userSelect: showMsg ? "none" : "auto" }}>
        <div className="h-full w-full px-30">
          <h1 className="font-mainheading font-extrabold bg-gradient-to-b from-white to-[#9A9A9A] bg-clip-text text-transparent text-4xl">ERROR - {errMsgID}</h1>
          <div className="h-[calc(100%-100px)] w-full overflow-y-scroll mt-10 text-fourth">
            {detailsArr.map((element, index) => (
              <div key={index} className="mb-10">
                <h3 className="font-bold">{element.key}</h3>
                {<pre className="mt-2">{element.value}</pre>}
              </div>
            ))}
            <div className="mb-10">
              <h3 className="font-bold">AI RECOMMENDATION</h3>
              <div className="mt-2 cursor-pointer"  onClick={aiMsg === "Generate" ? () => setShowMsg(true) : () => {}}>
                {aiMsg === "Generate"
                  ? aiMsg
                  : JSON.parse(aiMsg).map((element: { key: string, value: string }, index: number) => (
                    <div key={index}>
                      <h3 className="font-medium">{element.key}</h3>
                      {<pre className="mb-2 whitespace-pre-wrap break-words">{element.value}</pre>}
                    </div>
                  ))
                }
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

const WarningMsg = ({ showMsg, setShowMsg, setAiMsg }: { showMsg: boolean, setShowMsg: React.Dispatch<React.SetStateAction<boolean>>, setAiMsg: React.Dispatch<React.SetStateAction<string>> }) => {
  const { errMsgID } = useParams();

  const onClickHandler = async () => {
    const aiResponse = await aiRecommendation(errMsgID as string);
    setShowMsg(false)
    setAiMsg(aiResponse)
  }
  return (
    <div className="h-[250px] w-[500px] bg-third rounded-2xl absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-20" style={showMsg ? { display: "block" } : { display: "none" }}>
      <div className="h-[70px] w-[70px] bg-secondary rounded-full blur-[90px] absolute top-20 left-1/2 transform -translate-x-1/2 z-0"></div>
      <div className="h-full px-20 py-5 text-secondary flex flex-col justify-center items-center gap-5">
        <h1 className="font-roboto font-bold text-xl text-fourth">WARNING</h1>
        <p className="font-roboto font-light text-[15px] text-center text-fourth">The error data will be sent to an external AI to help determine the cause and provide a possible solution.</p>
        <button className="h-8 w-30 bg-gradient-to-b from-white to-[#9A9A9A] rounded-[7px] font-roboto font-extrabold text-[12px] main-btn text-third mt-2" onClick={onClickHandler}>GENERATE</button>
      </div>
    </div>
  )
}

export default ErrorDetails