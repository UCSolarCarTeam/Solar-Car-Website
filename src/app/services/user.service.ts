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

  getUsers() {
    return this.firestore
      .collection('users-collection')
      .snapshotChanges();
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

  verifyUser(userId) {
    const userRef = this.firestore.collection('users-collection').doc(userId);
    return userRef.update({
      verified: true
    });
  }
}
