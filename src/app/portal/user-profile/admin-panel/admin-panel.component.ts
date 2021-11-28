import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserAction } from 'src/app/models/user-action';
import { UserPrivilege } from 'src/app/models/user-privilege';
import { AuthService } from 'src/app/services/auth.service';
import { UserActionService } from 'src/app/services/user-action.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  userActionHistory: UserAction[];
  users: User[];
  privileges: UserPrivilege[] = Object.keys(UserPrivilege).map(key => UserPrivilege[key]);
  userPrivileges: any;

  constructor(private userActionService: UserActionService, private userService: UserService, private authService: AuthService) {
    this.userActionHistory = [];
    this.userPrivileges = new Map<string, UserPrivilege[]>();
  }

  ngOnInit(): void {
    if(this.authService.isAdmin()){
      this.userService.getUsers().subscribe(users => {
        this.users = users.map(u => {
          const user = {
            id: u.payload.doc.id,
            ...u.payload.doc.data() as object
          } as User;
          const uid = user.id;
          this.userPrivileges.set(uid, user.userPrivileges);
          return user;
        });
      });
    }
  }

  getUserActions(uid: string) {
    this.userActionHistory = [];
    this.userActionService.getUserActions(uid).then(userActions => {
      userActions.forEach((doc) => {
        this.userActionHistory.push({
          id: doc.id,
          ...doc.data() as object
        } as UserAction);
        let action = this.userActionHistory.pop();
        this.userService.getUser(action.uid).subscribe(doc => {
          const user = doc.data() as User;
          action.uid = user.displayName;
          this.userActionHistory.push(action);
        });
      });
    });
  }

  getPrivilegeString(privileges: UserPrivilege[]): string {
    if(privileges.length == 1) {
      return privileges[0];
    }
    let privilegeString = "";
    privileges.forEach(p => {
      privilegeString += p + ", ";
    });
    return privilegeString;
  }

  verifyUser(userId: string) {
    this.userService.verifyUser(userId);
  }

  updateUserPrivileges(uid: string, privilege: UserPrivilege, event: any) {
    if (event.target.checked) {
      this.userService.addUserPrivilege(uid, privilege);
    } else {
      this.userService.removeUserPrivilege(uid, privilege);
    }
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId);
  }

  userHasPrivilege(uid: string, privilege: UserPrivilege) {
    return this.userPrivileges.get(uid).includes(privilege);
  }
}
