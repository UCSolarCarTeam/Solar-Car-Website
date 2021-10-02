import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private firestore: AngularFirestore) {}

  addMember(member: Member) {
    console.log(member);
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('members-collection')
        .add(member)
        .then(response => { console.log(response); }, error => reject(error));
    });
  }

  getMembers() {
    return this.firestore
      .collection('members-collection')
      .snapshotChanges();
  }

  updateMember(member: Member) {
    const memberRef = this.firestore.collection('members-collection').doc(member.id);
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
    this.firestore
      .collection('members-collection')
      .doc(member.id)
      .delete();
  }

  TeamCaptain() {
    return this.firestore.collection('members-collection',
      ref => ref.where('position', '==', 'captain')).get();
  }
}
