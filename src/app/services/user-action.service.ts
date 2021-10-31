import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserAction } from '../models/user-action';

@Injectable({
  providedIn: 'root'
})

export class UserActionService {
  constructor(private firestore: AngularFirestore) { }

  addUserAction(userAction: UserAction) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('user-actions-collection')
        .add(userAction);
    });
  }

  getUserActions(uid: string) {
    return this.firestore
      .collection('user-actions-collection')
      .ref.where('uid', '==', uid).get();
  }

  updateUserAction(userAction: UserAction) {
    const userActionRef = this.firestore.collection('user-actions-collection').doc(userAction.id);
    return userActionRef.update({
      uid: userAction.uid,
      eid: userAction.eid,
      action: userAction.action,
      dateTime: userAction.dateTime
    });
  }

  deleteUserAction(userAction: UserAction) {
    this.firestore
      .collection('user-actions-collection')
      .doc(userAction.id)
      .delete();
  }
}
