import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserActionService } from 'src/app/services/user-action.service';
import { UserAction } from 'src/app/models/user-action';
import { UserPrivilege } from 'src/app/models/user-privilege';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  users: User[];
  userActions: UserAction[];
  userActionHistory: UserAction[];

  constructor(private authService: AuthService, private userService: UserService, private userActionService: UserActionService) {
    this.userActionHistory = [];
    this.userActions = [];
  }

  ngOnInit(): void {
    if(this.authService.isAdmin()){
      this.userService.getUsers().subscribe(users => {
        this.users = users.map(u => {
          return {
            id: u.payload.doc.id,
            ...u.payload.doc.data() as object
          } as User;
        });
      });
    }
    this.userActionService.getUserActions(this.authService.user.id).then(userActions => {
      userActions.forEach((doc) => {
        this.userActions.push({
          id: doc.id,
          ...doc.data() as object
        } as UserAction);
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

  getAuth() {
    return this.authService;
  }

  verifyUser(userId) {
    this.userService.verifyUser(userId);
  }

  getUserActions(uid) {
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
}
