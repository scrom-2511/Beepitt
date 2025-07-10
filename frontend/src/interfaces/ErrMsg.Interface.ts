import type { Key } from "react";

export interface ErrMsgObj{
    errName: string;
    errMsg: string;
    errStack: string;
}

export interface ErrMsg{
    _id: Key;
    userID: string;
    filePath: string;
    solved: boolean;
    errMsgObj: ErrMsgObj;
    time: string;
    createdAt: string;
    note: string;
}