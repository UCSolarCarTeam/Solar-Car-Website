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
        const item = {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as Item;
        if (item.borrowedByUser === '') {
          item.borrowedByUser = '';
          return item;
        }
        if (item.borrowedByUser === this.user.id) {
          item.borrowedByUser = 'Borrowed by: You';
          return item;
        }
        this.userService.getUser(item.borrowedByUser).subscribe(usr => {
          const itemUser = usr.data() as User;
          // borrowedUserName = item_user.displayName;
          item.borrowedByUser = 'Borrowed by: ' + itemUser.displayName;
        });
        return item;
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
            borrowedByUser: '',
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
                borrowedByUser: '',
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
              borrowedByUser: '',
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
            borrowedByUser: '',
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
    if (item.isBorrowed) {
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
    this.updateItemId = '';
    this.addItemForm.get('isBorrowable').enable();
  }

  renderBorrowModal(item: Item) {
    if (confirm('Are you sure you would like to borrow this item?')) {
      if (item.isBorrowable === true && item.isBorrowed === false) {
      this.inventoryService.borrowItem(item);
      }
    }
  }
  renderReturnModal(item: Item) {
    if (confirm('Are you sure you would like to return this item?')) {
      if (item.isBorrowable === true && item.isBorrowed === true ) {
        item.borrowedByUser = this.user.id;
        this.inventoryService.returnItem(item);
      }
    }
  }

  returnItemFilter() {
    this.runSearch(1);
  }

  runSearch(search = 0) {
    // Declare variables
    let input, filter, table, tr, td1, td2, td3, td4, i,
    txtValue1, txtValue2, txtValue3, txtValue4;
    if (search === 0) {
      input = document.getElementsByClassName('search-field')[0];
      filter = input.value.toUpperCase();
    } else {
      input = 'Borrowed by: You';
      filter = input.toUpperCase();
      document.getElementsByClassName('search-field')[0].setAttribute('value', '*return');
    }

    table = document.getElementsByClassName('inventory-table')[0];
    tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
      td1 = tr[i].getElementsByTagName('td')[1]; // Name
      td2 = tr[i].getElementsByTagName('td')[2]; // Internal #
      td3 = tr[i].getElementsByTagName('td')[3]; // External #
      td4 = tr[i].getElementsByTagName('td')[6]; // External #
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      txtValue3 = td3.textContent || td3.innerText;
      txtValue4 = td4.textContent || td4.innerText;
      if (txtValue1.toUpperCase().indexOf(filter) > -1 ||
            txtValue2.toUpperCase().indexOf(filter) > -1 ||
            txtValue3.toUpperCase().indexOf(filter) > -1 ||
            txtValue4.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
    }
  }
}




