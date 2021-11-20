import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { UserPrivilege } from '../models/user-privilege';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    private userService: UserService
  ) {
    this.user = null;
    // This is for testing so we don't have to keep signing in. Remove if developing or testing
    // the user authentication functionality, or run in production mode (NOT RECOMMENDED)
    if (!environment.production) {
      this.user = { id: 'testID', email: 'testEmail', displayName: 'testName', verified: true,
                    userPrivileges: [UserPrivilege.ADMIN], userActions: []};
    }
  }

  Login(email, password) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        if(!res.user.emailVerified) {
          window.alert('Please verify your email address before logging in.');
          this.auth.signOut();
        }
        this.userService.getUser(res.user.uid).subscribe(usr => {
          const user = usr.data() as User;
          if(!user.verified) {
            window.alert('Please ask your manager to verify you before logging in.');
            this.auth.signOut();
          }
          this.user = user;
          this.router.navigateByUrl('portal/user');
        });
      }).catch(err => {
        window.alert(err.message);
      });
  }

  SignUp(displayName, email, password) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.user = {
          id: res.user.uid,
          displayName,
          email,
          verified: false,
          userPrivileges: [UserPrivilege.NONE],
          userActions: []
        };
        this.auth.currentUser.then(user => {
          user.sendEmailVerification()
        });
        this.userService.addUser(this.user);
      }).catch(err => {
        window.alert(err.message);
      });
  }

  LogOut() {
    this.auth.signOut().then(() => {
      this.userService.logout(this.user.id);
      this.user = null;
      this.router.navigateByUrl('portal/login');
    });
  }

  ChangeEmail(email) {
    this.auth.currentUser.then(user => {
      user.updateEmail(email).then(() => {
        this.user.email = email;
        this.userService.updateUser(this.user);
      });
    });
  }

  ResetPassword(email) {
    this.auth.sendPasswordResetEmail(email);
  }

  ChangePassword(password) {
    this.auth.currentUser.then(user => {
      user.updatePassword(password).then(() => {
        this.userService.updateUser(this.user);
      });
    });
  }

  isAdmin() {
    return this.user && this.user.userPrivileges.includes(UserPrivilege.ADMIN);
  }

  hasBusinessPrivileges() {
    return this.user && (this.user.userPrivileges.includes(UserPrivilege.ADMIN)
      || this.user.userPrivileges.includes(UserPrivilege.BUSINESS));
  }
}
