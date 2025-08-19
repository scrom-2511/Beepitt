import type React from "react";
import NavigationBar from "../components/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { selectUsername, setUsername } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import type { EmailsContactInterface, PhoneNumsContactInterface } from "../interfaces/UserContacts.Interface";
import { usernameUpdate } from "../requestHandler/UsernameUpdate.ReqHandler";
import {
  selectUserContact,
  selectUserContactEmailIDs,
  selectUserContactPhoneNums,
  setEmailsContact,
  setPhoneNumsContact,
} from "../features/userContact/userContactInfoSlice";
import { updateContactInfo } from "../requestHandler/UpdateContactInfo.ReqHandler";
import { settingsFetch } from "../requestHandler/SettingsFetch.ReqHandler";
import { updateAlertSettings } from "../requestHandler/UpdateAlertSettings.ReqHandler";

const Settings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await settingsFetch();
        console.log(data);
        console.log(data.data.contactInfo);

        dispatch(setUsername(data.data.username));
        dispatch(setEmailsContact(data.data.contactInfo.emailIDs));
        dispatch(setPhoneNumsContact(data.data.contactInfo.phoneNums));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [selectedTab, setSelectedTab] = useState<Number>(1);
  return (
    <div className="h-full w-full">
      <NavigationBar position="static" />
      <div className="h-[calc(100%-100px)] w-full relative">
        <div className="h-full w-full px-30">
          <h1 className="font-mainheading font-extrabold bg-gradient-to-b from-white to-[#9A9A9A] bg-clip-text text-transparent text-4xl">
            SETTINGS
          </h1>
          <div className="h-[calc(100%-100px)] overflow-y-scroll mt-10">
            <div className="flex gap-5 text-secondary ">
              <div
                className="button-navigation h-[40px]"
                onClick={() => setSelectedTab(1)}
                style={{
                  borderBottom: selectedTab === 1 ? "2px solid #D7D7D7" : "",
                }}
              >
                GENERAL
              </div>
              <div
                className="button-navigation h-[40px]"
                onClick={() => setSelectedTab(2)}
                style={{
                  borderBottom: selectedTab === 2 ? "2px solid #D7D7D7" : "",
                }}
              >
                ABOUT YOU
              </div>
            </div>
            {selectedTab === 1 && <General />}
            {selectedTab === 2 && <AboutYou />}
          </div>
        </div>
      </div>
    </div>
  );
};

const General = () => {
  const dispatch = useDispatch();

  const [alertPause, setAlertPause] = useState<boolean>(false);
  const [alertPauseOnPhoneCall, setAlertPauseOnPhoneCall] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await settingsFetch();
        setAlertPause(data.data.alertPause || false);
        setAlertPauseOnPhoneCall(data.data.alertPauseOnPhoneCall || false);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchData();
  }, []);

  const handleOnClickCheckBox = async (
    newAlertPause: boolean,
    newalertPauseOnPhoneCall: boolean
  ) => {
    try {
      await updateAlertSettings({
        alertPause: newAlertPause,
        alertPauseOnPhoneCall: newalertPauseOnPhoneCall,
      });
    } catch (error) {
      console.error("Error updating alert settings:", error);
    }
  };

  return (
    <div>
      <div className="h-[250px] w-auto mb-10 rounded-2xl overflow-hidden bg-third relative mt-5">
        <div className="h-full mx-30 grid grid-rows-2 text-[#CACACA]">
          <h2 className="font-roboto font-extrabold text-4xl pb-1 row-start-1 row-end-2 self-end">30 DAYS</h2>
          <h2 className="font-roboto font-extralight text-2xl pt-1 row-start-2 row-end-3">REMAINING</h2>
        </div>
      </div>

      <div>
        <h1 className="text-xl text-secondary font-bold font-roboto">MANAGE ALERTS</h1>

        <div className="text-secondary font-secondmain font-bold flex items-center mt-10 gap-10">
          <div>
            <h1 className="text-l font-roboto">Alert Pause</h1>
            <p className="font-extralight text-sm text-fourth">
              Pause all notifications and alerts for a limited period.
            </p>
          </div>
          <input
            type="checkbox"
            name="alertPause"
            checked={alertPause}
            className="appearance-none w-5 h-5 bg-third checked:bg-secondary border border-gray-400 rounded"
            onChange={(e) => {
              const newValue = e.target.checked;
              setAlertPause(newValue);
              handleOnClickCheckBox(newValue, alertPauseOnPhoneCall);
            }}
          />
        </div>

        <div className="text-secondary font-secondmain font-bold flex items-center mt-10 gap-10">
          <div>
            <h1 className="text-l font-roboto">Alert Pause On Phone Call</h1>
            <p className="font-extralight text-sm text-fourth">
              Pause all alerts on a phone call for a limited period.
            </p>
          </div>
          <input
            type="checkbox"
            name="alertPauseOnPhoneCall"
            checked={alertPauseOnPhoneCall}
            className="appearance-none w-5 h-5 bg-third checked:bg-secondary border border-gray-400 rounded"
            onChange={(e) => {
              const newValue = e.target.checked;
              setAlertPauseOnPhoneCall(newValue);
              handleOnClickCheckBox(alertPause, newValue);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const AboutYou = () => {
  const emailsContactArr: (keyof EmailsContactInterface)[] = ["primary", "secondary", "tertiary"];
  const phoneContactArr: (keyof PhoneNumsContactInterface)[] = ["primary", "secondary", "tertiary"];
  const dispatch = useDispatch();

  const username = useSelector(selectUsername);
  const emailsContact = useSelector(selectUserContactEmailIDs);
  const phoneNumsContact = useSelector(selectUserContactPhoneNums);
  const [usernameTemp, setUsernameTemp] = useState<string>(username);
  const [usernameSaveBtn, setUsernameSaveBtn] = useState<boolean>(false);
  const [contactDetailsSaveBtn, setContactDetailsSaveBtn] = useState<boolean>(false);
  const handleOnClickUsernameSaveBtn = async () => {
    const { success, message } = await usernameUpdate({
      username: usernameTemp,
    });
    if (success) {
      console.log("done");
      dispatch(setUsername(username));
    }
  };

  const handleOnClickContactsSaveBtn = async () => {
    console.log(emailsContact);
    console.log(phoneNumsContact);
    const { success, message } = await updateContactInfo({
      emailIDs: emailsContact,
      phoneNums: phoneNumsContact,
    });
    if (success) {
      console.log("done");
      dispatch(setUsername(username));
    }
  };
  return (
    <div>
      <div className="h-auto w-auto  mb-10 rounded-2xl overflow-hidden bg-third relative mt-5 py-16">
        {/* <div className="h-[52px] w-[712px] bg-secondary rounded-full blur-[200px] top-0 left-1/2 transform -translate-x-1/2 absolute"></div> */}
        <div className="h-full mx-30 flex flex-col justify-center gap-10 text-[#CACACA]">
          <h2 className="h-[20px] font-roboto font-extrabold text-secondary text-l">YOUR DETAILS</h2>
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-5">
              <div className="h-7 flex text-fourth items-center">
                <h3 className="w-auto pr-10 font-roboto font-medium">USERNAME:</h3>
                <input
                  type="text"
                  value={usernameTemp}
                  maxLength={15}
                  className=" bg-third w-[300px] rounded-l"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUsernameTemp(e.target.value);
                    setUsernameSaveBtn(true);
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="h-7 flex text-fourth items-center">
                <h3 className="w-auto pr-10 font-roboto font-medium">EMAIL:</h3>
                <div className=" bg-third w-[300px] rounded-l">example@xyz.com</div>
              </div>
            </div>
          </div>
          <button
            className="h-7 mt-5 w-30 bg-gradient-to-b from-white to-[#9A9A9A] rounded-[7px] font-roboto font-extrabold text-[13px] main-btn text-third relative left-1/2 transform -translate-x-1/2"
            style={{ display: usernameSaveBtn ? "block" : "none" }}
            onClick={()=>{setUsernameSaveBtn(false);handleOnClickUsernameSaveBtn()}}
          >
            SAVE
          </button>
        </div>
      </div>

      <div className="w-auto mb-20 rounded-2xl overflow-hidden bg-third relative mt-5 py-16">
        {/* <div className="h-[52px] w-[712px] bg-secondary rounded-full blur-[200px] top-0 left-1/2 transform -translate-x-1/2 absolute"></div> */}
        <div className="h-full mx-30 flex flex-col justify-center gap-10 text-[#CACACA]">
          <h2 className="h-[20px] font-roboto font-extrabold text-secondary text-l">YOUR CONTACT DETAILS</h2>
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-col gap-5">
              <h2 className="font-roboto font-extrabold text-secondary text-l">Add Email</h2>
              {emailsContactArr.map((emailContact) => (
                <div key={emailContact} className="h-7 flex text-fourth items-center">
                  <h3 className="w-40 font-roboto font-medium">{emailContact.toUpperCase()}</h3>
                  <input
                    type="text"
                    value={useSelector(selectUserContactEmailIDs)[emailContact]}
                    maxLength={15}
                    className=" bg-third w-full  pl-3 rounded-l"
                    onChange={(e) => {
                      setContactDetailsSaveBtn(true);
                      dispatch(
                        setEmailsContact({
                          ...emailsContact,
                          [emailContact]: e.target.value,
                        })
                      );
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              <h2 className="font-roboto font-extrabold text-secondary text-l">Add Phone Number</h2>
              {phoneContactArr.map((phoneContact) => (
                <div key={phoneContact} className="h-7 flex text-fourth items-center">
                  <h3 className="w-40 font-roboto font-medium">{phoneContact.toUpperCase()}</h3>
                  <input
                    type="text"
                    value={useSelector(selectUserContactPhoneNums)[phoneContact]}
                    maxLength={15}
                    className=" bg-third w-full  pl-3 rounded-l"
                    onChange={(e) => {
                      setContactDetailsSaveBtn(true);
                      dispatch(
                        setPhoneNumsContact({
                          ...phoneNumsContact,
                          [phoneContact]: e.target.value,
                        })
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            className="h-7 mt-5 w-30 bg-gradient-to-b from-white to-[#9A9A9A] rounded-[7px] font-roboto font-extrabold text-[13px] main-btn text-third relative left-1/2 transform -translate-x-1/2"
            style={{ display: contactDetailsSaveBtn ? "block" : "none" }}
            onClick={()=>{setContactDetailsSaveBtn(false);handleOnClickContactsSaveBtn()}}
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
