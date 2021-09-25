import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean;

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
  ) {
    this.isLoggedIn = false;
  }

  Login(email, password) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigateByUrl('portal');
        this.isLoggedIn = true;
      }).catch(err => {
        window.alert(err.message);
      })
  }

  SignUp(email, password) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigateByUrl('portal');
        this.isLoggedIn = true;
      }).catch(err => {
        window.alert(err.message);
      })
  }

  LogOut() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('portal/login');
      this.isLoggedIn = false;
    });
  }
}
