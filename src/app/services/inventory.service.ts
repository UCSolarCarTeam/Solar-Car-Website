import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../models/item.model';
import { Action } from '../models/action';
import { UserActionService } from './user-action.service';



@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private firestore: AngularFirestore, private userActionService: UserActionService) {}
    addInventoryItem(item: Item) {
      const user = JSON.parse(window.sessionStorage.getItem('User'));
      return new Promise<any>((resolve, reject) => {
        this.firestore
          .collection('inventory-collection')
          .add(item)
          .then(response => {
            this.userActionService.addUserAction({
              uid: user.id,
              uName: user.displayName,
              eid: item.internalPartNumber,
              eName: 'Item: ' + item.name,
              action: Action.ADDED,
              dateTime: new Date().toLocaleString(),
            });
            resolve(response);
          }, error => reject(error));
      });
    }

    getInventoryItems() {
      return this.firestore
        .collection('inventory-collection')
        .snapshotChanges();
    }

    updateInventoryItem(item: Item) {
      const user = JSON.parse(window.sessionStorage.getItem('User'));
      const itemRef = this.firestore.collection('inventory-collection').doc(item.id);
      this.userActionService.addUserAction({
        uid: user.id,
        uName: user.displayName,
        eid: item.internalPartNumber,
        eName: 'Item: ' + item.name,
        action: Action.UPDATED,
        dateTime: new Date().toLocaleString(),
      });
      return itemRef.update({
        name: item.name,
        internalPartNumber: item.internalPartNumber,
        manufacturerPartNumber: item.manufacturerPartNumber,
        location: item.location,
        amount: item.amount,
        isBorrowable: item.isBorrowable,
         // isBorrowed: item.isBorrowed,
         // inputedByUser: item.inputedByUser,
         // borrowedByUser: item.borrowedByUser,
        imageUrl: item.imageUrl,
        image: item.image
      });
    }

}
