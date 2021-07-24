import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sponsor } from '../models/sponsor';

@Injectable({
  providedIn: 'root'
})

export class SponsorService {
  constructor(private firestore: AngularFirestore) {}

  addSponsor(sponsor: Sponsor) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection("sponsors-collection")
        .add(sponsor)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  getSponsors() {
    return this.firestore
      .collection("sponsors-collection")
      .snapshotChanges();
  }

  deleteSponsor(id) {
    return this.firestore
      .collection("sponsor-collection")
      .doc(id)
      .delete();
  }
}
