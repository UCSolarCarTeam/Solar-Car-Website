import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Item } from "src/app/models/item.model";
import { AuthService } from "src/app/services/auth.service";
import { FileUploadService } from "src/app/services/file-upload.service";
import { InventoryService } from "src/app/services/inventory.service";
import { UserActionService } from "src/app/services/user-action.service";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import { ImageCroppedEvent, LoadedImage } from "ngx-image-cropper";
// Awesome Notifications Docs:
// https://f3oall.github.io/awesome-notifications/docs/popups/confirmation-window
import AWN from "awesome-notifications";
let globalOptions = {};
let notifier = new AWN(globalOptions);
let nextCallOptions = {};
@Component({
  selector: "app-edit-inventory",
  templateUrl: "./edit-inventory.component.html",
  styleUrls: ["./edit-inventory.component.css"],
})
export class EditInventoryComponent implements OnInit {
  addItemForm: UntypedFormGroup;
  updateItemId: string;
  items: Item[];
  locations: string[];
  user = JSON.parse(window.sessionStorage.getItem("User"));
  submitButtonText: string;
  checkoutButtonText: string;
  editButtonText: string;
  elecLocals: string[];
  mechLocals: string[];
  lockerLocals: string[];
  basementLocals: string[];
  amountUnitOptions: string[];

  image: File;
  previewImgUrl: string;
  imageChangedEvent: any = "";
  borrowFilter: boolean;
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.image = event.target.files[0];
  }
  imageCropped(event: ImageCroppedEvent) {
    this.previewImgUrl = event.base64;
    this.dataUrlToFile();
  }
  async dataUrlToFile(): Promise<void> {
    const dataUrl = this.previewImgUrl;
    const fileName = this.image.name;
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    const myImage = new File([blob], fileName, { type: "image/webp" });
    this.image = myImage;
  }
  addItemSuccess() {
    notifier.success("Your item has been added", nextCallOptions);
  }
  constructor(
    private inventoryService: InventoryService,
    private formBuilder: UntypedFormBuilder,
    private uploadService: FileUploadService,
    private userActionService: UserActionService,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.addItemForm = this.formBuilder.group({
      name: [""],
      type: [""],
      internalPartNumber: [""],
      manufacturerPartNumber: [""],
      manufacturer: [""],
      link: [""],
      description: [""],
      amountUnit: [""],
      location: [""],
      amount: 0,
      isBorrowable: false,
      image: [""],
    });
    this.elecLocals = ["Cabinet - Bin 1", "Cabinet - Bin 2", "Cabinet - Bin 3"];
    this.mechLocals = ["Cabinet - Bin 1", "Cabinet - Bin 2", "Cabinet - Bin 3"];
    this.lockerLocals = [
      "Cabinet - Bin 1",
      "Cabinet - Bin 2",
      "Cabinet - Bin 3",
    ];
    this.basementLocals = [
      "Cabinet - Bin 1",
      "Cabinet - Bin 2",
      "Cabinet - Bin 3",
    ];
    this.amountUnitOptions = [
      "Each",
      "Meter",
      "Feet",
      "Pack",
      "Pounds",
      "Liter",
      "Roll",
      "Yard",
    ];

    this.locations = [];
    this.checkoutButtonText = "Borrow";
    this.editButtonText = "Edit";
    this.submitButtonText = "Add Item";
    this.borrowFilter = false;
  }

  ngOnInit(): void {
    this.inventoryService.getInventoryItems().subscribe((res) => {
      this.items = res.map((e) => {
        const item = {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        } as Item;
        if (item.borrowedByUser === "") {
          item.borrowedByUser = "";
          return item;
        }
        if (item.borrowedByUser === this.user.id) {
          item.borrowedByUser = "Borrowed by: You";
          return item;
        }
        this.userService.getUser(item.borrowedByUser).subscribe((usr) => {
          const itemUser = usr.data() as User;
          // borrowedUserName = item_user.displayName;
          item.borrowedByUser = "Borrowed by: " + itemUser.displayName;
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
    if (this.submitButtonText.startsWith("Edit Item")) {
      if (this.image === null) {
        const newItem = {
          id: this.updateItemId,
          name: this.addItemForm.get("name").value,
          type: this.addItemForm.get("type").value,
          internalPartNumber: this.addItemForm.get("internalPartNumber").value,
          manufacturerPartNumber: this.addItemForm.get("manufacturerPartNumber")
            .value,
          manufacturer: this.addItemForm.get("manufacturer").value,
          link: this.addItemForm.get("link").value,
          description: this.addItemForm.get("description").value,
          amountUnit: this.addItemForm.get("amountUnit").value,
          location: this.addItemForm.get("location").value,
          amount: this.addItemForm.get("amount").value,
          isBorrowable: this.addItemForm.get("isBorrowable").value,
          isBorrowed: false,
          borrowedByUser: "",
          image: null,
          imageUrl: this.previewImgUrl,
        };

        this.inventoryService.updateInventoryItem(newItem);
      } else {
        const id = this.updateItemId;
        const name = this.addItemForm.get("name").value;
        const type = this.addItemForm.get("type").value;
        const internalPartNumber =
          this.addItemForm.get("internalPartNumber").value;
        const manufacturerPartNumber = this.addItemForm.get(
          "manufacturerPartNumber"
        ).value;
        const manufacturer = this.addItemForm.get("manufacturer").value;
        const link = this.addItemForm.get("link").value;
        const description = this.addItemForm.get("description").value;
        const amountUnit = this.addItemForm.get("amountUnit").value;
        const location = this.addItemForm.get("location").value;
        const amount = this.addItemForm.get("amount").value;
        const isBorrowable = this.addItemForm.get("isBorrowable").value;
        this.uploadService
          .uploadFile(this.image, "assets/inventory_images/")
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadUrl) => {
              const newItem = {
                id,
                name,
                type,
                internalPartNumber,
                manufacturerPartNumber,
                manufacturer,
                link,
                description,
                amountUnit,
                location,
                amount,
                isBorrowable,
                isBorrowed: false,
                borrowedByUser: "",
                image: null,
                imageUrl: downloadUrl,
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
    if (this.image === null) {
      const newItem = {
        name: this.addItemForm.get("name").value,
        type: this.addItemForm.get("type").value,
        internalPartNumber: this.addItemForm.get("internalPartNumber").value,
        manufacturerPartNumber: this.addItemForm.get("manufacturerPartNumber")
          .value,
        manufacturer: this.addItemForm.get("manufacturer").value,
        link: this.addItemForm.get("link").value,
        description: this.addItemForm.get("description").value,
        amountUnit: this.addItemForm.get("amountUnit").value,
        location: this.addItemForm.get("location").value,
        amount: this.addItemForm.get("amount").value,
        isBorrowable: this.addItemForm.get("isBorrowable").value,
        isBorrowed: false,
        borrowedByUser: "",
        image: null,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/solarcardatabase.appspot.com/o/assets%2Finventory_images%2Fno_img.png?alt=media&token=47ff8883-f59c-48d9-89dd-5db91fe23021",
      };
      this.inventoryService.addInventoryItem(newItem);
    } else {
      const name = this.addItemForm.get("name").value;
      const type = this.addItemForm.get("type").value;
      const internalPartNumber =
        this.addItemForm.get("internalPartNumber").value;
      const manufacturerPartNumber = this.addItemForm.get(
        "manufacturerPartNumber"
      ).value;
      const manufacturer = this.addItemForm.get("manufacturer").value;
      const link = this.addItemForm.get("link").value;
      const description = this.addItemForm.get("description").value;
      const amountUnit = this.addItemForm.get("amountUnit").value;
      const location = this.addItemForm.get("location").value;
      const amount = this.addItemForm.get("amount").value;
      const isBorrowable = this.addItemForm.get("isBorrowable").value;
      this.uploadService
        .uploadFile(this.image, "assets/inventory_images/")
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadUrl) => {
            const newItem = {
              name,
              type,
              internalPartNumber,
              manufacturerPartNumber,
              manufacturer,
              link,
              description,
              amountUnit,
              location,
              amount,
              isBorrowable,
              isBorrowed: false,
              borrowedByUser: "",
              image: null,
              imageUrl: downloadUrl,
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
      document
        .getElementsByClassName("itemControlModal")[0]
        .setAttribute("style", "display:block");
    } else {
      document
        .getElementsByClassName("itemControlModal")[0]
        .setAttribute("style", "display:none");
    }
  }

  renderAddItem() {
    this.resetForm();
    this.modalVisiblity(true);
    this.submitButtonText = "Add Item";
  }

  renderEditItem(item: Item) {
    this.resetForm();
    this.modalVisiblity(true);
    this.updateItemId = item.id;
    this.addItemForm.get("name").setValue(item.name);
    this.addItemForm.get("type").setValue(item.type);
    this.addItemForm
      .get("internalPartNumber")
      .setValue(item.internalPartNumber);
    this.addItemForm
      .get("manufacturerPartNumber")
      .setValue(item.manufacturerPartNumber);
    this.addItemForm.get("manufacturer").setValue(item.manufacturer);
    this.addItemForm.get("description").setValue(item.description);
    this.addItemForm.get("amountUnit").setValue(item.amountUnit);
    this.addItemForm.get("link").setValue(item.link);
    this.addItemForm.get("location").setValue(item.location);
    this.addItemForm.get("amount").setValue(item.amount);
    this.addItemForm.get("isBorrowable").setValue(item.isBorrowable);
    if (item.isBorrowed) {
      this.addItemForm.get("isBorrowable").disable();
    }
    this.previewImgUrl = item.imageUrl;
    this.image = null;
    this.submitButtonText = "Edit Item";
    document.documentElement.scrollTop = 0;
  }

  cancelItemForm() {
    this.modalVisiblity(false);
    this.resetForm();
  }

  resetForm() {
    this.addItemForm.reset();
    this.previewImgUrl = "";
    this.imageChangedEvent = "";
    this.updateItemId = "";
    this.addItemForm.get("isBorrowable").enable();
    // this.submitButtonText = 'Add Item';
  }

  renderBorrowModal(item: Item) {
    let onOk = () => {
      if (item.isBorrowable === true && item.isBorrowed === false) {
        let promise = this.inventoryService.borrowItem(item);
        notifier.async(
          promise,
          "Item has been borrowed",
          "Something got wrong, contact tech support"
        );
      }
    };
    notifier.confirm("Are you sure?", onOk, {
      labels: {
        confirm: "Dangerous action",
      },
    });
  }
  renderReturnModal(item: Item) {
    let onOk = () => {
      if (item.isBorrowable === true && item.isBorrowed === true) {
        item.borrowedByUser = this.user.id;
        let promise = this.inventoryService.returnItem(item);
        notifier.async(
          promise,
          "Item has been returned",
          "Something got wrong, contact tech support"
        );
      }
    };

    notifier.confirm(
      "Are you sure?",
      onOk,
      //  onCancel,
      {
        labels: {
          confirm: "Dangerous action",
        },
      }
    );
  }

  useItemModal(item: Item) {
    if (item.amount > 0) {
      if (confirm("The item count will be reduced by 1.")) {
        this.inventoryService.useItem(item);
      }
    } else {
      alert("There are no more left");
    }
  }

  returnItemFilter() {
    if (this.borrowFilter) {
      this.runSearch(2); // Clears Filter
      this.borrowFilter = false;
    } else {
      this.runSearch(1); // Enables Filter
      this.borrowFilter = true;
    }
  }

  runSearch(search = 0) {
    // Declare variables
    let input;
    let filter;
    let table;
    let tr;
    let td0;
    let td1;
    let td2;
    let td3;
    let td4;
    let td5;
    let i;
    let txtValue0;
    let txtValue1;
    let txtValue2;
    let txtValue3;
    let txtValue4;
    let txtValue5;
    if (search === 0) {
      input = document.getElementsByClassName("search-field")[0];
      filter = input.value.toUpperCase();
    } else if (search === 2) {
      input = "";
      filter = input.toUpperCase();
      document
        .getElementsByClassName("search-field")[0]
        .setAttribute("value", "");
    } else {
      input = "Borrowed by: You";
      filter = input.toUpperCase();
      document
        .getElementsByClassName("search-field")[0]
        .setAttribute("value", "*Borrowed*");
    }

    table = document.getElementsByClassName("inventory-table")[0];
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
      td0 = tr[i].getElementsByTagName("td")[0]; // Name
      td1 = tr[i].getElementsByTagName("td")[1]; // Type
      td2 = tr[i].getElementsByTagName("td")[2]; // Internal #
      td3 = tr[i].getElementsByTagName("td")[3]; // External #
      td4 = tr[i].getElementsByTagName("td")[4]; // Location
      td5 = tr[i].getElementsByTagName("td")[6]; // Borrowed by
      txtValue0 = td0.textContent || td0.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      txtValue3 = td3.textContent || td3.innerText;
      txtValue4 = td4.textContent || td4.innerText;
      txtValue5 = td5.textContent || td5.innerText;
      if (
        txtValue0.toUpperCase().indexOf(filter) > -1 ||
        txtValue1.toUpperCase().indexOf(filter) > -1 ||
        txtValue2.toUpperCase().indexOf(filter) > -1 ||
        txtValue3.toUpperCase().indexOf(filter) > -1 ||
        txtValue4.toUpperCase().indexOf(filter) > -1 ||
        txtValue5.toUpperCase().indexOf(filter) > -1
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
  locationUpdate() {
    const location = document.getElementsByClassName("location-field")[0];
    if (this.addItemForm.get("location").value === "Custom") {
      location.setAttribute("style", "display:block");
    } else {
      location.setAttribute("style", "display:none");
    }
  }
  borrowableCheck() {
    if (
      this.addItemForm.get("isBorrowable").value === true &&
      this.addItemForm.get("amount").value !== 1
    ) {
      if (
        confirm(
          "The max value for an item than can be borrowed is 1. If you proceed, the item count will be changed to 1"
        )
      ) {
        this.addItemForm.controls["amount"].setValue(1);
      } else {
        this.addItemForm.controls["isBorrowable"].setValue(false);
      }
    }
  }
}
