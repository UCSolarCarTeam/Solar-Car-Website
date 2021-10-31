import { Action } from "./action";

export interface UserAction {
    id?: string;
    uid: string;
    eid: string;
    action: Action;
    dateTime: string;
}
