import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { UserActionService } from 'src/app/services/user-action.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent implements OnInit {
  addItemForm: FormGroup;
  updateItemId: string;
  items: Item[];
  locations: string[];
  user = JSON.parse(window.sessionStorage.getItem('User'));
  submitButtonText: string;
  checkoutButtonText: string;
  editButtonText: string;

  image: File;
  previewImgUrl: string;

  constructor(
    private inventoryService: InventoryService,
    private formBuilder: FormBuilder,
    private uploadService: FileUploadService,
    private userActionService: UserActionService,
    private authService: AuthService,
    private userService: UserService) {

    this.addItemForm = this.formBuilder.group({
        name: [''],
        internalPartNumber: [''],
        manufacturerPartNumber: [''],
        location: [''],
        amount: 0,
        isBorrowable: false,
        image: ['']
    });
    
    this.locations = [];
    this.checkoutButtonText = 'Borrow';
    this.editButtonText = 'Edit';
    this.submitButtonText = 'Add Item';

  }

  ngOnInit(): void {
    this.inventoryService.getInventoryItems().subscribe(res => {
      this.items = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as Item;
      });
    });
  }

  setImage(files: any) {
    this.image = files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewImgUrl = event.target.result;
    };
    reader.readAsDataURL(this.image);
  }

  manageItemForm() {
    if (this.submitButtonText.startsWith('Edit Item')) {
        if (this.image == null) {
          const newItem = {
            id: this.updateItemId,
            name: this.addItemForm.get('name').value,
            internalPartNumber: this.addItemForm.get('internalPartNumber').value,
            manufacturerPartNumber: this.addItemForm.get('manufacturerPartNumber').value,
            location: this.addItemForm.get('location').value,
            amount: this.addItemForm.get('amount').value,
            isBorrowable: this.addItemForm.get('isBorrowable').value,
            isBorrowed: false,
            borrowedByUser: "",
            image: null,
            imageUrl: this.previewImgUrl
          };
          
          this.inventoryService.updateInventoryItem(newItem);
          
        } else {
          const name = this.addItemForm.get('name').value;
          const internalPartNumber = this.addItemForm.get('internalPartNumber').value;
          const manufacturerPartNumber = this.addItemForm.get('manufacturerPartNumber').value;
          const location = this.addItemForm.get('location').value;
          const amount = this.addItemForm.get('amount').value;
          const isBorrowable = this.addItemForm.get('isBorrowable').value;
          this.uploadService.uploadFile(this.image, 'assets/inventory_images/').then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadUrl) => {
              const  newItem = {
                id: this.updateItemId,
                name: name,
                internalPartNumber: internalPartNumber,
                manufacturerPartNumber: manufacturerPartNumber,
                location: location,
                amount: amount,
                isBorrowable: isBorrowable,
                isBorrowed: false,
                borrowedByUser: "",
                image: null,
                imageUrl: downloadUrl
              };
              this.inventoryService.updateInventoryItem(newItem);
            });
          });
        }
        this.resetForm();
        this.modalVisiblity(false);

        return;
      }
      // Adding New Item
    if (this.image == null) {
            const  newItem = {
              name: this.addItemForm.get('name').value,
              internalPartNumber: this.addItemForm.get('internalPartNumber').value,
              manufacturerPartNumber: this.addItemForm.get('manufacturerPartNumber').value,
              location: this.addItemForm.get('location').value,
              amount: this.addItemForm.get('amount').value,
              isBorrowable: this.addItemForm.get('isBorrowable').value,
              isBorrowed: false,
              borrowedByUser: null,
              image: null,
              imageUrl: 'https://firebasestorage.googleapis.com/v0/b/solarcardatabase.appspot.com/o/assets%2Finventory_images%2Fno_img.png?alt=media&token=47ff8883-f59c-48d9-89dd-5db91fe23021'
            };
            this.inventoryService.addInventoryItem(newItem);

      } else {
        const name = this.addItemForm.get('name').value;
        const internalPartNumber = this.addItemForm.get('internalPartNumber').value;
        const manufacturerPartNumber = this.addItemForm.get('manufacturerPartNumber').value;
        const location = this.addItemForm.get('location').value;
        const amount = this.addItemForm.get('amount').value;
        const isBorrowable = this.addItemForm.get('isBorrowable').value;
      this.uploadService.uploadFile(this.image, 'assets/inventory_images/').then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const  newItem = {
            id: this.updateItemId,
            name: name,
            internalPartNumber: internalPartNumber,
            manufacturerPartNumber: manufacturerPartNumber,
            location: location,
            amount: amount,
            isBorrowable: isBorrowable,
            isBorrowed: false,
            borrowedByUser: null,
            image: null,
            imageUrl: downloadUrl
          };
          this.inventoryService.addInventoryItem(newItem);
        });
      });
    }
    this.resetForm();
    this.modalVisiblity(false);
  }

  modalVisiblity(status: boolean) {
    if (status === true) {
      document.getElementsByClassName('itemControlModal')[0].setAttribute('style', 'display:block');
    } else {
      document.getElementsByClassName('itemControlModal')[0].setAttribute('style', 'display:none');
    }
  }


  renderAddItem() {
    this.resetForm();
    this.modalVisiblity(true);
    this.submitButtonText = 'Add Item';
  }

  renderEditItem(item: Item) {
    this.resetForm();
    this.modalVisiblity(true);
    this.updateItemId = item.id;
    this.addItemForm.get('name').setValue(item.name);
    this.addItemForm.get('internalPartNumber').setValue(item.internalPartNumber);
    this.addItemForm.get('manufacturerPartNumber').setValue(item.manufacturerPartNumber);
    this.addItemForm.get('location').setValue(item.location);
    this.addItemForm.get('amount').setValue(item.amount);
    this.addItemForm.get('isBorrowable').setValue(item.isBorrowable);
    if (item.isBorrowed){
    this.addItemForm.get('isBorrowable').disable();
    }
    this.previewImgUrl = item.imageUrl;
    this.image = null;
    this.submitButtonText = 'Edit Item';
    document.documentElement.scrollTop = 0;
  }

  cancelItemForm() {
    this.modalVisiblity(false);
    this.resetForm();
  }

  resetForm() {
    this.addItemForm.reset();
    // this.previewImgUrl = '';
    this.updateItemId = '';
    this.addItemForm.get('isBorrowable').enable();
    //this.submitButtonText = 'Add Item';
  }

  borrowDisplay (item: Item) {
    if (item.isBorrowable == true){
      if(item.isBorrowed && item.borrowedByUser != this.user.id){
        return "Borrowed by: ";
      }
    } 
  }

  renderBorrowModal(item: Item){
    if(confirm("Are you sure you would like to borrow this item?")){
      if(item.isBorrowable == true && item.isBorrowed == false){
      this.inventoryService.borrowItem(item);
      }
    }
  }
  renderReturnModal(item: Item){
    if(confirm("Are you sure you would like to return this item?")){
      if(item.isBorrowable == true && item.isBorrowed == true){
      this.inventoryService.returnItem(item);
      }
    }
  }

  getDisplayName (uid: string){
    this.userService.getUser(uid).subscribe(usr => {
      const item_user = usr.data() as User;
      return item_user.displayName;
    });
  }
}




