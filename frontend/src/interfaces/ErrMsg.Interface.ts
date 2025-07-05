export interface ErrMsgPropsInterface{
    errName:string;
    time:string;
}
export interface ErrMsgInterface extends ErrMsgPropsInterface{
    id:string;
    solved:boolean;
}