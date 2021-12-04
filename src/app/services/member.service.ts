import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Action } from '../models/action';
import { Member } from '../models/member.model';
import { UserActionService } from './user-action.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private firestore: AngularFirestore, private userActionService: UserActionService) {}

  addMember(member: Member) {
    const user = JSON.parse(window.sessionStorage.getItem('User'));
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('members-collection')
        .add(member)
        .then(response => {
          this.userActionService.addUserAction({
            uid: user.id,
            uName: user.displayName,
            eid: response.id,
            eName: 'Member: ' + member.name,
            action: Action.ADDED,
            dateTime: new Date().toLocaleString(),
          });
          resolve(response);
        }, error => reject(error));
    });
  }

  getMembers() {
    return this.firestore
      .collection('members-collection')
      .snapshotChanges();
  }

  updateMember(member: Member) {
    const user = JSON.parse(window.sessionStorage.getItem('User'));
    const memberRef = this.firestore.collection('members-collection').doc(member.id);
    this.userActionService.addUserAction({
      uid: user.id,
      uName: user.displayName,
      eid: member.id,
      eName: 'Member: ' + member.name,
      action: Action.UPDATED,
      dateTime: new Date().toLocaleString(),
    });
    return memberRef.update({
      name: member.name,
      position: member.position,
      subteam: member.subteam,
      major: member.major,
      description: member.description,
      year: member.year,
      imageName: member.imageName,
      image: member.image
    });
  }

  deleteMember(member: Member) {
    const user = JSON.parse(window.sessionStorage.getItem('User'));
    this.firestore
      .collection('members-collection')
      .doc(member.id)
      .delete();
    this.userActionService.addUserAction({
      uid: user.id,
      uName: user.displayName,
      eid: member.id,
      eName: 'Member: ' + member.name,
      action: Action.DELETED,
      dateTime: new Date().toLocaleString(),
    });
  }

  TeamCaptain() {
    return this.firestore.collection('members-collection',
      ref => ref.where('position', '==', 'Team Captain')).get();
  }

  EngineeringManager() {
    return this.firestore.collection('members-collection',
      ref => ref.where('position', '==', 'Engineering Team Manager')).get();
  }

  BusinessManager() {
    return this.firestore.collection('members-collection',
      ref => ref.where('position', '==', 'Business Team Manager')).get();
  }

  AllMembers() {
    return this.firestore.collection('members-collection',
      ref => ref.where('position', '==', 'Member')).get();
  }

  AllManagers() {
    return this.firestore.collection('members-collection',
      ref => ref.where('position', '==', 'Manager')).get();
  }
}
