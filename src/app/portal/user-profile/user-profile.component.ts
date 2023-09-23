import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { UserActionService } from "src/app/services/user-action.service";
import { UserAction } from "src/app/models/user-action";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { User } from "src/app/models/user";
import AWN from "awesome-notifications";
let globalOptions = {};
let notifier = new AWN(globalOptions);
let nextCallOptions = {};
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  userForm: UntypedFormGroup;
  userActions: UserAction[];
  user: User;
  updateUserPasswordNotification(promise: Promise<any>) {
    notifier.async(
      promise,
      "User password has been updated",
      "User password has failed to update. Please use at least 6 characters or contact tech support"
    );
  }
  updateUserNameNotification(promise: Promise<any>) {
    notifier.async(
      promise,
      "User Name has been updated",
      "User Name has failed to update, contact tech support"
    );
  }
  updateUserEmailNotification(promise: Promise<any>) {
    notifier.async(
      promise,
      "User email has been updated",
      "User email has failed to update. Please use @ucalgary.ca email or contact tech support"
    );
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private userActionService: UserActionService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      displayName: "",
      email: "",
      password: "",
    });
    this.userActions = [];
    this.user = JSON.parse(window.sessionStorage.getItem("User"));
  }

  ngOnInit(): void {
    this.userActionService.getUserActions(this.user.id).then((userActions) => {
      userActions.forEach((doc) => {
        this.userActions.push({
          id: doc.id,
          ...(doc.data() as object),
        } as UserAction);
      });
    });
    this.userForm.get("displayName").setValue(this.user.displayName);
    this.userForm.get("email").setValue(this.user.email);
  }

  getAuth() {
    return this.authService;
  }

  getUser() {
    const user = JSON.parse(window.sessionStorage.getItem("User"));
    return user;
  }

  manageUser() {
    const user = JSON.parse(window.sessionStorage.getItem("User"));
    if (
      this.userForm.get("displayName").value !== user.displayName &&
      this.userForm.get("displayName").value !== ""
    ) {
      user.displayName = this.userForm.get("displayName").value;
      let promise = this.userService.updateUser(user);
      this.updateUserNameNotification(promise);
    }
    if (this.userForm.get("email").value !== user.email) {
      let promise = this.authService.ChangeEmail(
        this.userForm.get("email").value
      );
      this.updateUserEmailNotification(promise);
    }
    if (
      this.userForm.get("password").value !== "" &&
      this.userForm.get("password").value !== user.password
    ) {
      console.log(user.password); // undefined for some reason
      console.log(this.userForm.get("password").value); //The one typed in the form...
      user.password = this.userForm.get("password").value;
      let promise = this.authService.ChangePassword(
        this.userForm.get("password").value
      );
      this.updateUserPasswordNotification(promise);
    }
  }
}
