import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import AWN from "awesome-notifications";
let globalOptions = {};
let notifier = new AWN(globalOptions);
let nextCallOptions = {};
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  signUpForm: UntypedFormGroup;
  passwordsDoNotMatch: boolean;
  ucalgaryEmailUsed = true;
  registerUserNotification(promise: Promise<any>) {
    notifier.async(
      promise,
      "User has been registered",
      "User has failed to register, contact tech support"
    );
  }
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService
  ) {
    this.signUpForm = this.formBuilder.group({
      displayName: [""],
      email: ["", Validators.pattern(".+@.+.c.+")],
      password: [
        "",
        Validators.pattern(
          "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!#%*?&])[A-Za-zd$@$!%*?&].{8,}"
        ),
      ],
      passwordConfirm: [""],
    });
  }

  SignUp() {
    if (
      this.signUpForm.get("password").value !==
      this.signUpForm.get("passwordConfirm").value
    ) {
      this.passwordsDoNotMatch = true;
      return;
    }
    if (!this.signUpForm.get("email").value.includes("ucalgary.ca")) {
      this.ucalgaryEmailUsed = false;
      return;
    }
    this.passwordsDoNotMatch = false;
    let promise = this.authService.SignUp(
      this.signUpForm.get("displayName").value,
      this.signUpForm.get("email").value,
      this.signUpForm.get("password").value
    );
    this.registerUserNotification(promise);
  }

  SignUpSuccess() {
    const user = JSON.parse(window.sessionStorage.getItem("User"));
    return user !== null && !user.verified;
  }
}
