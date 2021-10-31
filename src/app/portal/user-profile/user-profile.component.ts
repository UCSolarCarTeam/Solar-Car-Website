import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserActionService } from 'src/app/services/user-action.service';
import { UserAction } from 'src/app/models/user-action';
import { UserPrivilege } from 'src/app/models/user-privilege';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  userActions: UserAction[];

  constructor(private authService: AuthService, private userService: UserService, private userActionService: UserActionService,
      private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      displayName: '',
      email: ''
    });
    this.userActions = [];
  }

  ngOnInit(): void {
    this.userActionService.getUserActions(this.authService.user.id).then(userActions => {
      userActions.forEach((doc) => {
        this.userActions.push({
          id: doc.id,
          ...doc.data() as object
        } as UserAction);
      });
    });
    this.userForm.get('displayName').setValue(this.authService.user.displayName);
    this.userForm.get('email').setValue(this.authService.user.email);
  }

  getAuth() {
    return this.authService;
  }

  manageUser() {
    return;
  }
}
