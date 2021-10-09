import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private firestore: AngularFirestore) { }

  addUser(user: User) {
    const userRef = this.firestore.collection('users-collection').doc(user.id);
    return userRef.set(user);
  }

  getUser(uid: string) {
    return this.firestore
      .collection('users-collection')
      .doc(uid)
      .get();
  }

  updateUser(user: User) {
    const userRef = this.firestore.collection('users-collection').doc(user.id);
    return userRef.update({
      email: user.email,
      verified: user.verified,
      displayName: user.displayName
    });
  }

  deleteUser(user: User) {
    this.firestore
      .collection('users-collection')
      .doc(user.id)
      .delete();
  }

  login(uid: string) {
    this.firestore
      .collection('users-collection')
      .doc(uid)
      .update({loggedIn: true});
  }

  logout(uid: string) {
    this.firestore
      .collection('users-collection')
      .doc(uid)
      .update({loggedIn: false});
  }
}
