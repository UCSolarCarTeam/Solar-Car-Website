import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from './user.service';

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
    this.user = {id: "test", email: "test", displayName: "test", loggedIn: true};
  }

  Login(email, password) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.userService.getUser(res.user.uid).subscribe(usr => {
          this.userService.login(res.user.uid);
          this.user = usr.data() as User;
          this.router.navigateByUrl('portal');
        });
      }).catch(err => {
        window.alert(err.message);
      })
  }

  SignUp(email, password) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.user = {
          id: res.user.uid,
          displayName: "temp",
          email: email,
          loggedIn: true
        };
        this.userService.addUser(this.user);
        this.Login(email, password);
        
      }).catch(err => {
        window.alert(err.message);
      })
  }

  LogOut() {
    this.auth.signOut().then(() => {
      this.userService.logout(this.user.id);
      this.user = null;
      this.router.navigateByUrl('portal/login');
    });
  }
}
