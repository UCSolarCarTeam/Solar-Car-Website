import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Sponsor } from '../models/sponsor';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})

export class SponsorService {
  constructor(private firestore: AngularFirestore, private fileUpload: FileUploadService) {}

  addSponsor(sponsor: Sponsor) {
<<<<<<< HEAD
=======

>>>>>>> 01cee6a (Fix linting errors)
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

  deleteSponsor(id) {
    return this.firestore
      .collection('sponsor-collection')
      .doc(id)
      .delete();
  }
}
