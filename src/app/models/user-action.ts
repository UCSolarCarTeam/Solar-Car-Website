import { Action } from "./action";

export interface UserAction {
    id?: string;
    uid: string;
    uName: string;
    eid: string;
    eName: string;
    action: Action;
    dateTime: string;
}
