import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../models/item.model'
import { Action } from '../models/action';
import { UserActionService } from './user-action.service';



@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private firestore: AngularFirestore, private userActionService: UserActionService) {}
    addInventoryItem(item: Item){
      const user = JSON.parse(window.sessionStorage.getItem('User'));
      return new Promise<any>((resolve, reject) => {
        this.firestore
          .collection('inventory-collection')
          .add(item)
          .then(response => {
            this.userActionService.addUserAction({
              uid: user.id,
              uName: user.displayName,
              eid: item.id,
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
        eid: item.id,
        eName: 'Item: ' + item.name,
        action: Action.UPDATED,
        dateTime: new Date().toLocaleString(),
      });
      return itemRef.update({
        name: item.name,
        type: item.type,
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
    

    borrowItem(item: Item) {
      const user = JSON.parse(window.sessionStorage.getItem('User'));
      const itemRef = this.firestore.collection('inventory-collection').doc(item.id);
      
      this.userActionService.addUserAction({
        
        uid: user.id,
        uName: user.displayName,
        eid: item.id,
        eName: 'Item: ' + item.name,
        action: Action.BORROWED,
        dateTime: new Date().toLocaleString(),
      });
      
      return itemRef.update({
         isBorrowed: true,
         borrowedByUser: user.id

      });
    }
    returnItem(item: Item) {
      const user = JSON.parse(window.sessionStorage.getItem('User'));
      const itemRef = this.firestore.collection('inventory-collection').doc(item.id);
      this.userActionService.addUserAction({
        uid: user.id,
        uName: user.displayName,
        eid: item.id,
        eName: 'Item: ' + item.name,
        action: Action.RETURNED,
        dateTime: new Date().toLocaleString(),
      });
      return itemRef.update({
         isBorrowed: false,
         borrowedByUser: ""

      });
    }
    useItem(item: Item) {
      const user = JSON.parse(window.sessionStorage.getItem('User'));
      const itemRef = this.firestore.collection('inventory-collection').doc(item.id);
      this.userActionService.addUserAction({
        uid: user.id,
        uName: user.displayName,
        eid: item.id,
        eName: 'Item: ' + item.name,
        action: Action.USED,
        dateTime: new Date().toLocaleString(),
      });
      item.amount = item.amount - 1;
      return itemRef.update({
         amount: item.amount

      });
    }
    /*
    searchCollection(search : string){
      return this.firestore
        .collection('inventory-collection')
        .ref.where('name', '>=', search)
        .where('name', '>=', search + '~');
    }*/

}
