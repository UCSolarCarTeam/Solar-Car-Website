import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { UserAction } from 'src/app/models/user-action';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { UserActionService } from 'src/app/services/user-action.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent implements OnInit {
  addItemForm: FormGroup;
  updateItemId: string;
  items: Item[];
  locations: String [];

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
    private authService: AuthService) { 

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

  manageItemForm(){
    if (this.submitButtonText.startsWith('Edit Item')) {
        if (this.image == null) {
          const newItem = {
            id: this.updateItemId,
            name: this.addItemForm.get('name').value,
            internalPartNumber: this.addItemForm.get('position').value,
            manufacturerPartNumber: this.addItemForm.get('subteam').value,
            location: this.addItemForm.get('major').value,
            amount: this.addItemForm.get('description').value,
            isBorrowable: this.addItemForm.get('year').value,
            imageUrl: this.previewImgUrl,
            image: null
          };
          this.inventoryService.updateInventoryItem(newItem);
        } else {

          this.uploadService.uploadFile(this.image, 'assets/inventory_images/').then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadUrl) => {
              const newItem = {
                id: this.updateItemId,
                name: this.addItemForm.get('name').value,
                internalPartNumber: this.addItemForm.get('position').value,
                manufacturerPartNumber: this.addItemForm.get('subteam').value,
                location: this.addItemForm.get('major').value,
                amount: this.addItemForm.get('description').value,
                isBorrowable: this.addItemForm.get('year').value,
                imageUrl: downloadUrl,
                image: null,
              };
              this.inventoryService.updateInventoryItem(newItem);
            });
          });
        }
        this.addItemForm.reset();
        this.modalVisiblity(false);
        return;
      }

      this.uploadService.uploadFile(this.image, 'assets/inventory_images/').then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const  newItem = {
            id: this.updateItemId,
            name: this.addItemForm.get('name').value,
            internalPartNumber: this.addItemForm.get('position').value,
            manufacturerPartNumber: this.addItemForm.get('subteam').value,
            location: this.addItemForm.get('major').value,
            amount: this.addItemForm.get('description').value,
            isBorrowable: this.addItemForm.get('year').value,
            imageName: this.previewImgUrl,
            image: null,
            imageUrl: downloadUrl,
          };
          this.inventoryService.addInventoryItem(newItem);
        });
      });
      this.addItemForm.reset();
  }

  modalVisiblity(status: Boolean){
    alert();
    if (status == true){
      document.getElementsByClassName("itemControlModal")[0].setAttribute("style", "block");
    } else{
      document.getElementsByClassName("itemControlModal")[0].setAttribute("style", "none");
    }
    
  }
  renderAddItem(){
    this.modalVisiblity(true);
    this.addItemForm.reset();
    this.submitButtonText = 'Add Item';
  }

  renderEditItem(item: Item){
    this.modalVisiblity(true);
    this.updateItemId = item.id;
    this.addItemForm.get('name').setValue(item.name);
    this.addItemForm.get('internalPartNumber').setValue(item.internalPartNumber);
    this.addItemForm.get('manufacturerPartNumber').setValue(item.manufacturerPartNumber);
    this.addItemForm.get('location').setValue(item.location);
    this.addItemForm.get('amount').setValue(item.amount);
    this.addItemForm.get('isBorrowable').setValue(item.isBorrowable);
    this.previewImgUrl = item.imageUrl;
    this.image = null;
    this.submitButtonText = 'Edit Item';
    document.documentElement.scrollTop = 0;
  }

  cancelItemForm(){
    this.modalVisiblity(false);
  } 

}




