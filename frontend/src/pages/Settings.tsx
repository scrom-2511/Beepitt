import type React from "react";
import NavigationBar from "../components/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { useState } from "react";
import type { EmailsContactInterface, PhoneNumsContactInterface } from "../interfaces/UserContacts.Interface";

const Settings = () => {
    const emailsContactArr: (keyof EmailsContactInterface)[] = ["primary", "secondary", "tertiary"];
    const phoneContactArr: (keyof PhoneNumsContactInterface)[] = ["primary", "secondary", "tertiary"];
    const dispatch = useDispatch()

    const [emailsContact, setEmailsContact] = useState<EmailsContactInterface>({ primary: "", secondary: "", tertiary: "" })
    const [phoneNumsContact, setPhoneNumsContact] = useState<PhoneNumsContactInterface>({ primary: "", secondary: "", tertiary: "" })
    const username = useSelector(selectUser)
    const [usernameTemp, setUsernameTemp] = useState<string>(username);
    return (
        <div className="h-full w-full">
            <NavigationBar position="static" />
            <div className="h-[calc(100%-100px)] w-full relative">
                <div className="h-full w-full px-30">
                    <h1 className="font-mainheading font-extrabold bg-gradient-to-b from-white to-[#9A9A9A] bg-clip-text text-transparent text-4xl">
                        SETTINGS
                    </h1>
                    <div className="h-[calc(100%-100px)] overflow-y-scroll mt-10">
                        <div className="h-[350px] w-auto border border-secondary mb-20 rounded-2xl overflow-hidden bg-third relative mt-5">
                            <div className="h-[52px] w-[712px] bg-secondary rounded-full blur-[200px] top-0 left-1/2 transform -translate-x-1/2 absolute"></div>
                            <div className="h-full mx-30 grid grid-rows-2 text-[#CACACA]">
                                <h2 className="font-roboto font-extrabold text-4xl pb-1 row-start-1 row-end-2 self-end">30 DAYS</h2>
                                <h2 className="font-roboto font-extralight text-2xl pt-1 row-start-2 row-end-3">REMAINING</h2>
                            </div>
                        </div>

                        <div className="h-[200px] w-auto border border-secondary mb-20 rounded-2xl overflow-hidden bg-third relative mt-5">
                            <div className="h-[52px] w-[712px] bg-secondary rounded-full blur-[200px] top-0 left-1/2 transform -translate-x-1/2 absolute"></div>
                            <div className="h-full mx-30 flex flex-col justify-center gap-10 text-[#CACACA]">
                                <h2 className="h-[20px] font-roboto font-extrabold text-secondary text-l">YOUR DETAILS</h2>
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="flex flex-col gap-5">
                                            <div className="h-7 flex text-fourth items-center">
                                                <h3 className="w-40 font-roboto font-medium">USERNAME:</h3>
                                                <input type="text" value={usernameTemp} maxLength={15} className="h-[30px] bg-third w-full border border-secondary pl-3 rounded-l" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsernameTemp(e.target.value)} />
                                            </div>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                            <div className="h-7 flex text-fourth items-center">
                                                <h3 className="w-40 font-roboto font-medium">EMAIL:</h3>
                                                <div className="h-[30px] bg-third w-full border border-secondary pl-3 rounded-l">example@xyz.com</div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className="h-[350px] w-auto border border-secondary mb-20 rounded-2xl overflow-hidden bg-third relative mt-5">
                            <div className="h-[52px] w-[712px] bg-secondary rounded-full blur-[200px] top-0 left-1/2 transform -translate-x-1/2 absolute"></div>
                            <div className="h-full mx-30 flex flex-col justify-center gap-10 text-[#CACACA]">
                                <h2 className="h-[20px] font-roboto font-extrabold text-secondary text-l">YOUR CONTACT DETAILS</h2>
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="flex flex-col gap-5">
                                        <h2 className="font-roboto font-extrabold text-secondary text-l">ADD EMAIL</h2>
                                        {emailsContactArr.map((emailContact) =>
                                            <div key={emailContact} className="h-7 flex text-fourth items-center">
                                                <h3 className="w-40 font-roboto font-medium">{emailContact.toUpperCase()}</h3>
                                                <input type="text" value={emailsContact[emailContact]} maxLength={15} className="h-[30px] bg-third w-full border border-secondary pl-3 rounded-l" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailsContact((prev) => ({ ...prev, [emailContact]: e.target.value }))} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <h2 className="font-roboto font-extrabold text-secondary text-l">ADD PHONE NUMBER</h2>
                                        {phoneContactArr.map((phoneContact) => (
                                            <div key={phoneContact} className="h-7 flex text-fourth items-center">
                                                <h3 className="w-40 font-roboto font-medium">{phoneContact.toUpperCase()}</h3>
                                                <input type="text" value={phoneNumsContact[phoneContact]} maxLength={15} className="h-[30px] bg-third w-full border border-secondary pl-3 rounded-l" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumsContact((prev) => ({ ...prev, [phoneContact]: e.target.value }))} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;