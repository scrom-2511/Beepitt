import { useDispatch, useSelector } from "react-redux";
import NavigationBar from "../components/NavigationBar";
import { selectUsername } from "../features/user/userSlice";
import { selectErrMsgs, setErrMsgs } from "../features/errorMsgs/errMsgsSlice";
import type { ErrMsg } from "../interfaces/ErrMsg.Interface";
import { useEffect } from "react";
import { errMsgFetch } from "../requestHandler/ErrMsgFetch.ReqHandler";
import { useNavigate } from "react-router-dom";
import { updateSolved } from "../requestHandler/UpdateSolved";

const Dashboard = () => {
  const dispatch = useDispatch();

  const username: string = useSelector(selectUsername);
  const errMsgs = useSelector(selectErrMsgs);

  useEffect(() => {
    const fetchErrMsgs = async () => {
      const errMsgs = await errMsgFetch();
      console.log(errMsgs);
      if (Array.isArray(errMsgs)) {
        dispatch(setErrMsgs(errMsgs));
      } else {
        console.error("Error fetching error messages", errMsgs);
      }
    };
    fetchErrMsgs();
  }, []);

  return (
    <div className="h-full w-full">
      <NavigationBar position="static" />
      <div className="h-[calc(100%-100px)] w-full relative">
        <div className="h-full w-full">
          <h1 className="font-mainheading font-extrabold bg-gradient-to-b from-white to-[#9A9A9A] bg-clip-text text-transparent text-4xl ml-30">
            {"DASHBOARD"}
          </h1>
          <div className="h-[calc(100%-100px)] w-full overflow-y-scroll mt-10">
            {errMsgs.length !== 0 && errMsgs.map((errMsg) => <ErrorCard key={errMsg._id} errMsg={errMsg} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const ErrorCard = ({ errMsg }: { errMsg: ErrMsg }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const date = new Date(errMsg.createdAt);
  const localDate = date.toLocaleString();

  const borderColor = errMsg.solved ? "border-[#b3b3b3]" : "border-[#e70000]";
  const bgColor = errMsg.solved ? "bg-third" : "bg-[#310000]";
  const glowColor = errMsg.solved ? "bg-secondary" : "bg-[#FF0000]";
  const textColor = errMsg.solved ? "text-[#CACACA]" : "text-[#FF0000]";
  const bgBtnColor = errMsg.solved ? "bg-[#464646]" : "bg-[#d90000]";

  const handleOnClick = (errMsgID: string) => {
    navigate(`/errDetails/${errMsgID}`);
  };

  const handleOnClickSolved = async (errMsgID: string, solved: boolean) => {
    if (solved === true) {
      return;
    }
    const { success, message } = await updateSolved({ errMsgID });
    if (success) {
      const errMsgs = await errMsgFetch();
      console.log(errMsgs);
      if (Array.isArray(errMsgs)) {
        dispatch(setErrMsgs(errMsgs));
      } else {
        console.error("Error fetching error messages", errMsgs);
      }
    }
  };

  return (
    <div className={`h-[130px] w-auto border ${borderColor} mb-10 mx-30 rounded-xl overflow-hidden ${bgColor} relative mt-5`}>
      <div className={`h-[52px] w-[712px] ${glowColor} rounded-full blur-[200px] top-0 left-1/2 transform -translate-x-1/2 absolute`}></div>
      <div
        className={`h-full mx-15 flex flex-col justify-center gap-3 ${textColor} relative hover:cursor-pointer`}
        onClick={() => {
          handleOnClick(String(errMsg._id));
        }}
      >
        <button
          className={`font-roboto font-bold absolute transform top-1/2 -translate-y-1/2 right-0 text-[13px] hover:cursor-pointer border ${borderColor} px-3 py-1 rounded-[5px]`}
          onClick={(e) => {
            e.stopPropagation();
            handleOnClickSolved(String(errMsg._id), errMsg.solved);
          }}
        >
          {errMsg.solved === false ? "CONFIRM FIX" : "FIXED"}
        </button>
        <h2 className="font-roboto font-extrabold">{errMsg.errMsgObj.errName}</h2>
        <h2 className="font-roboto text-[13px]">{localDate}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
