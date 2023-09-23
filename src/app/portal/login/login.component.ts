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
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: UntypedFormGroup;
  userLoginNotification(promise: Promise<any>) {
    notifier.async(
      promise,
      "User has logged in",
      "User has failed log in, contact tech support"
    );
  }
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.pattern(".+@.+..+")],
      password: [""],
    });
  }

  Login() {
    let promise = this.authService.Login(
      this.loginForm.get("email").value,
      this.loginForm.get("password").value
    );
    this.userLoginNotification(promise);
  }
}
