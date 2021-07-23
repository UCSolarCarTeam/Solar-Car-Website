import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class SponsorService {
  constructor(private firestore: AngularFirestore) {}
}
