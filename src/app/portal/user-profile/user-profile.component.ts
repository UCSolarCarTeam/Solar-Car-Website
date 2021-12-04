import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserActionService } from 'src/app/services/user-action.service';
import { UserAction } from 'src/app/models/user-action';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  userActions: UserAction[];
  user: User;

  constructor(private authService: AuthService, private userService: UserService, private userActionService: UserActionService,
              private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      displayName: '',
      email: '',
      password: '',
    });
    this.userActions = [];
    this.user = JSON.parse(window.sessionStorage.getItem('User'));
  }

  ngOnInit(): void {
    this.userActionService.getUserActions(this.user.id).then(userActions => {
      userActions.forEach((doc) => {
        this.userActions.push({
          id: doc.id,
          ...doc.data() as object
        } as UserAction);
      });
    });
    this.userForm.get('displayName').setValue(this.user.displayName);
    this.userForm.get('email').setValue(this.user.email);
  }

  getAuth() {
    return this.authService;
  }

  getUser() {
    const user = JSON.parse(window.sessionStorage.getItem('User'));
    return user;
  }

  manageUser() {
    const user = JSON.parse(window.sessionStorage.getItem('User'));
    if (this.userForm.get('displayName').value !== user.displayName) {
      user.displayName = this.userForm.get('displayName').value;
      this.userService.updateUser(user);
    }
    if (this.userForm.get('email').value !== user.email) {
      this.authService.ChangeEmail(this.userForm.get('email').value);
    }
    if (this.userForm.get('password').value !== '') {
      this.authService.ChangePassword(this.userForm.get('password').value);
    }
  }
}
