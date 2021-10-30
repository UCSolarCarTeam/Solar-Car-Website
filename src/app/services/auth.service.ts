import { HostListener, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

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
      this.user = {id: 'testID', email: 'testEmail', displayName: 'testName', verified: true, admin: true};
    }
  }

  Login(email, password) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.userService.getUser(res.user.uid).subscribe(usr => {
          const user = usr.data() as User;
          this.userService.login(res.user.uid);
          this.user = user;
          this.router.navigateByUrl('portal');
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
          displayName: displayName,
          email: email,
          verified: false,
          admin: false
        };
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
}
