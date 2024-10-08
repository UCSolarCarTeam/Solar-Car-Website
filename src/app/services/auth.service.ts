import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { UserService } from "./user.service";
import { environment } from "src/environments/environment";
import { UserPrivilege } from "../models/user-privilege";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    private userService: UserService
  ) {}

  Login(email, password) {
    return this.auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        if (!res.user.emailVerified) {
          window.alert("Please verify your email address before logging in.");
          this.auth.signOut();
        }
        this.userService.getUser(res.user.uid).subscribe((usr) => {
          const user = usr.data() as User;
          if (!user.verified) {
            window.alert(
              "Please ask your manager to verify you before logging in."
            );
            this.auth.signOut();
          }
          window.sessionStorage.setItem("User", JSON.stringify(user));
          this.router.navigateByUrl("portal/user");
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  SignUp(displayName, email, password) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const user = {
          id: res.user.uid,
          displayName,
          email,
          verified: false,
          userPrivileges: [UserPrivilege.NONE],
          userActions: [],
        };
        this.auth.currentUser.then((user) => {
          user.sendEmailVerification();
        });
        this.userService.addUser(user);
        alert(
          "Succesfully signed up. Please confirm your email and ask your manager to approve your account."
        );
        this.router.navigateByUrl("portal/login");
      })
      .catch((err) => {
        throw err;
        // window.alert(err.message);
      });
  }

  LogOut() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl("portal/login");
      window.sessionStorage.removeItem("User");
    });
  }

  ChangeEmail(email) {
    return this.auth.currentUser.then((user) => {
      user
        .updateEmail(email)
        .then(() => {
          const user = JSON.parse(window.sessionStorage.getItem("User"));
          user.email = email;
          this.userService.updateUser(user);
        })
        .catch((err) => {
          throw err;
        });
    });
  }

  ResetPassword(email) {
    return this.auth.sendPasswordResetEmail(email).catch((err) => {
      throw err;
    });
  }

  ChangePassword(password) {
    return this.auth.currentUser
      .then((user) => {
        return user.updatePassword(password);
      })
      .catch((err) => {
        throw err;
      });
  }

  isAdmin() {
    const user = JSON.parse(window.sessionStorage.getItem("User"));
    return user && user.userPrivileges.includes(UserPrivilege.ADMIN);
  }

  hasBusinessPrivileges() {
    const user = JSON.parse(window.sessionStorage.getItem("User"));
    return (
      user &&
      (user.userPrivileges.includes(UserPrivilege.ADMIN) ||
        user.userPrivileges.includes(UserPrivilege.BUSINESS))
    );
  }
  hasEngineeringPrivileges() {
    const user = JSON.parse(window.sessionStorage.getItem("User"));
    return (
      user &&
      (user.userPrivileges.includes(UserPrivilege.ADMIN) ||
        user.userPrivileges.includes(UserPrivilege.ENGINEERING))
    );
  }
}
