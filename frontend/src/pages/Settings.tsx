import type React from "react";
import NavigationBar from "../components/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { useState } from "react";
import type { emailsContactInterface, phoneNumsContactInterface } from "../interfaces/UserContacts.Interface";

const Settings = () => {
    const emailsContactArr: (keyof emailsContactInterface)[] = ["primary", "secondary", "tertiary"];
    const phoneContactArr: (keyof phoneNumsContactInterface)[] = ["primary","secondary", "tertiary"];
    const dispatch = useDispatch()

    const [emailsContact, setEmailsContact] = useState<emailsContactInterface>({ primary: "", secondary: "", tertiary: "" })
    const [phoneNumsContact, setPhoneNumsContact] = useState<emailsContactInterface>({ primary: "", secondary: "", tertiary: "" })
    const username = useSelector(selectUser)
    const [usernameTemp, setUsernameTemp] = useState<string>(username);
    return (
        <div className="h-full w-full">
            <NavigationBar position="static" />
            <div className="h-[calc(100%-100px)] w-full relative">
                <div className="h-full w-full pl-20">
                    <h1 className="font-mainheading font-extrabold bg-gradient-to-b from-white to-[#9A9A9A] bg-clip-text text-transparent text-4xl">
                        SETTINGS
                    </h1>
                    <div className="h-[calc(100%-100px)] overflow-y-scroll">
                        <div className="mt-12">
                            <h2 className="font-roboto font-extrabold text-secondary mb-7 text-l">YOUR DETAILS</h2>
                            <div className="h-7 flex mb-5 text-fourth items-center">
                                <h3 className="w-40 font-roboto font-medium">USERNAME:</h3>
                                <input type="text" value={usernameTemp} maxLength={15} className="bg-third w-60 border border-secondary pl-3 rounded-l" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsernameTemp(e.target.value)} />
                            </div>
                            <div className="h-7 flex mb-5 text-fourth items-center">
                                <h3 className="w-40 font-roboto font-medium">EMAIL:</h3>
                                <h3 className="bg-third w-60 border border-secondary pl-3 rounded-l">example@gmail.com</h3>
                            </div>
                        </div>
                        <div className="mt-12">
                            <h2 className="font-roboto font-extrabold text-secondary mb-7 text-l">ADD EMAIL</h2>
                            {emailsContactArr.map((emailContact) =>
                                <div key={emailContact} className="h-7 flex mb-5 text-fourth items-center">
                                    <h3 className="w-40 font-roboto font-medium">{emailContact.toUpperCase()}</h3>
                                    <input type="text" value={emailsContact[emailContact]} maxLength={15} className="bg-third w-60 border border-secondary pl-3 rounded-l" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailsContact((prev) => ({ ...prev, [emailContact]: e.target.value }))} />
                                </div>
                            )}
                        </div>
                        <div className="mt-12">
                            <h2 className="font-roboto font-extrabold text-secondary mb-7 text-l">ADD PHONE NUMBER</h2>
                                {phoneContactArr.map((phoneContact)=>(
                                    <div key={phoneContact} className="h-7 flex mb-5 text-fourth items-center">
                                    <h3 className="w-40 font-roboto font-medium">PRIMARY:</h3>
                                    <input type="text" value={phoneNumsContact[phoneContact]} maxLength={15} className="bg-third w-60 border border-secondary pl-3 rounded-l" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumsContact((prev) => ({ ...prev, [phoneContact]: e.target.value }))} />
                                </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
