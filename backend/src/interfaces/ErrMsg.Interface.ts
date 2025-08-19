export interface ErrMsgObj{
    errName: string;
    errMsg: string;
    errStack: string;
}

export interface ErrMsg{
    _id: string;
    userID: string;
    filePath: string;
    solved: boolean;
    errMsgObj: ErrMsgObj;
    time?: string;
    createdAt: string;
    note?: string;
    aiRecommendation: string;
}