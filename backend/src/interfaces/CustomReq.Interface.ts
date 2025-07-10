import { Request } from "express";

export interface CustomReq extends Request{
    userID?: string;
}