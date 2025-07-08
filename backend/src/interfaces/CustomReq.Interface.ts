import { Request } from "express";

export interface CustomReq extends Request{
    body: {
        userID?: string;
        [key:string]: any;
    }
}