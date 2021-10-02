import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sponsor } from '../models/sponsor';

@Injectable({
  providedIn: 'root'
})

export class SponsorService {
  constructor(private firestore: AngularFirestore) { }

  addSponsor(sponsor: Sponsor) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('sponsors-collection')
        .add(sponsor)
        .then(response => { console.log(response); }, error => reject(error));
    });
  }

  getSponsors() {
    return this.firestore
      .collection('sponsors-collection')
      .snapshotChanges();
  }

  updateSponsor(sponsor: Sponsor) {
    const sponsorRef = this.firestore.collection('sponsors-collection').doc(sponsor.id);
    return sponsorRef.update({
      name: sponsor.name,
      link: sponsor.link,
      logo: sponsor.logo,
      logoUrl: sponsor.logoUrl,
      tier: sponsor.tier
    });
  }

  deleteSponsor(sponsor: Sponsor) {
    this.firestore
      .collection('sponsors-collection')
      .doc(sponsor.id)
      .delete();
  }
}
