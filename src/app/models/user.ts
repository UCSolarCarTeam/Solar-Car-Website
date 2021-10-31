import { UserAction } from './user-action';
import { UserPrivilege } from './user-privilege';

export interface User {
    id?: string;
    email: string;
    verified: boolean;
    displayName: string;
    userPrivileges: UserPrivilege[];
    userActions: UserAction[];
}
