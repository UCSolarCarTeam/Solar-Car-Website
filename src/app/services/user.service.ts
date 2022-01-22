import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { UserPrivilege } from '../models/user-privilege';

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
      displayName: user.displayName,
      userPrivileges: user.userPrivileges,
      userActions: user.userActions
    });
  }

  deleteUser(uid: string) {
    this.firestore
      .collection('users-collection')
      .doc(uid)
      .delete();
  }

  verifyUser(userId) {
    const userRef = this.firestore.collection('users-collection').doc(userId);
    return userRef.update({
      verified: true,
      userPrivileges: [ UserPrivilege.NONE ]
    });
  }

  addUserPrivilege(userId, privilege) {
    this.firestore.collection('users-collection').doc(userId).get().subscribe(usr => {
      const user = usr.data() as User;
      user.userPrivileges.push(privilege);
      this.updateUser(user);
    });
  }

  removeUserPrivilege(userId, privilege) {
    this.firestore.collection('users-collection').doc(userId).get().subscribe(usr => {
      const user = usr.data() as User;
      user.userPrivileges = user.userPrivileges.filter(p => p !== privilege);
      this.updateUser(user);
    });
  }
}
