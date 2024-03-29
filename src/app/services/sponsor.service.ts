import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Action } from "../models/action";
import { Sponsor } from "../models/sponsor";
import { UserActionService } from "./user-action.service";

@Injectable({
  providedIn: "root",
})
export class SponsorService {
  constructor(
    private firestore: AngularFirestore,
    private userActionService: UserActionService
  ) {}

  addSponsor(sponsor: Sponsor) {
    const user = JSON.parse(window.sessionStorage.getItem("User"));
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("sponsors-collection")
        .add(sponsor)
        .then(
          (response) => {
            this.userActionService.addUserAction({
              uid: user.id,
              uName: user.displayName,
              eid: response.id,
              eName: "Sponsor: " + sponsor.name,
              action: Action.ADDED,
              dateTime: new Date().toLocaleString(),
            });
            resolve(response);
          },
          (error) => reject(error)
        );
    });
  }

  getSponsor(id: string) {
    return this.firestore.collection("sponsors-collection").doc(id).get();
  }

  getSponsors() {
    return this.firestore.collection("sponsors-collection").snapshotChanges();
  }

  updateSponsor(sponsor: Sponsor) {
    const user = JSON.parse(window.sessionStorage.getItem("User"));
    const sponsorRef = this.firestore
      .collection("sponsors-collection")
      .doc(sponsor.id);
    this.userActionService.addUserAction({
      uid: user.id,
      uName: user.displayName,
      eid: sponsor.id,
      eName: "Sponsor: " + sponsor.name,
      action: Action.UPDATED,
      dateTime: new Date().toLocaleString(),
    });
    return sponsorRef
      .update({
        name: sponsor.name,
        link: sponsor.link,
        logo: sponsor.logo,
        logoUrl: sponsor.logoUrl,
        tier: sponsor.tier,
      })
      .catch((error) => {
        throw error;
      });
  }

  deleteSponsor(sponsor: Sponsor) {
    const user = JSON.parse(window.sessionStorage.getItem("User"));

    this.userActionService.addUserAction({
      uid: user.id,
      uName: user.displayName,
      eid: sponsor.id,
      eName: "Sponsor: " + sponsor.name,
      action: Action.DELETED,
      dateTime: new Date().toLocaleString(),
    });
    return this.firestore
      .collection("sponsors-collection")
      .doc(sponsor.id)
      .delete()
      .catch((error) => {
        throw error;
      });
  }
}
