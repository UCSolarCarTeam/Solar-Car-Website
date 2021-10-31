import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserActionService } from 'src/app/services/user-action.service';
import { UserAction } from 'src/app/models/user-action';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  users: User[];
  userActions: UserAction[];

  constructor(private authService: AuthService, private userService: UserService, private userActionService: UserActionService) { }

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
    this.userActions = [];
    this.userActionService.getUserActions(this.authService.user.id).then(userActions => {
      userActions.forEach((doc) => {
        this.userActions.push({
          id: doc.id,
          ...doc.data() as object
        } as UserAction);
      });
    });
  }

  getAuth() {
    return this.authService;
  }

  verifyUser(userId) {
    this.userService.verifyUser(userId);
  }

}
