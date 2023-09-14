import { Component, OnInit } from "@angular/core";

import { SponsorService } from "src/app/services/sponsor.service";
import { Sponsor } from "src/app/models/sponsor";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { FileUploadService } from "src/app/services/file-upload.service";
import { UserActionService } from "src/app/services/user-action.service";
import { UserAction } from "src/app/models/user-action";
import { ImageCroppedEvent, LoadedImage } from "ngx-image-cropper";
import AWN from "awesome-notifications";
let globalOptions = {};
let notifier = new AWN(globalOptions);
let nextCallOptions = {};
@Component({
  selector: "app-edit-sponsors",
  templateUrl: "./edit-sponsors.component.html",
  styleUrls: ["./edit-sponsors.component.css"],
})
export class EditSponsorsComponent implements OnInit {
  addSponsorForm: UntypedFormGroup;
  sponsors: Sponsor[];
  previewLogoUrl: string;
  mainButtonText: string;
  logo: File;
  updateSponsorId: string;
  tiers = ["Lead", "Platinum", "Gold", "Silver", "Bronze", "Friend"];
  actionHistory: UserAction[];
  imageChangedEvent: any = "";

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.logo = event.target.files[0];
  }
  imageCropped(event: ImageCroppedEvent) {
    this.previewLogoUrl = event.base64;
    this.dataUrlToFile();
  }
  addSponsorNotification(promise: Promise<any>) {
    notifier.async(
      promise,
      "Sponsor has been added",
      "Sponsor failed to add, contact tech support"
    );
  }
  updateSponsorNotification(promise: Promise<any>) {
    notifier.async(
      promise,
      "Sponsor has been updated",
      "Sponsor failed to update, contact tech support"
    );
  }
  removeSponsorNotification(promise: Promise<any>) {
    notifier.async(
      promise,
      "Sponsor has been removed",
      "Sponsor failed to remove, contact tech support"
    );
  }
  // Helper function
  async dataUrlToFile(): Promise<void> {
    const dataUrl = this.previewLogoUrl;
    const fileName = this.logo.name;
    const res: Response = await fetch(dataUrl);
    const blob: Blob = await res.blob();
    const myImage = new File([blob], fileName, { type: "image/webp" });
    this.logo = myImage;
  }
  constructor(
    private sponsorService: SponsorService,
    private uploadService: FileUploadService,
    private formBuilder: UntypedFormBuilder,
    private userActionService: UserActionService
  ) {
    this.addSponsorForm = this.formBuilder.group({
      name: [""],
      link: [""],
      logo: [""],
      tier: [null],
    });
    this.mainButtonText = "Add Sponsor";
    this.actionHistory = [];
  }

  ngOnInit(): void {
    this.sponsorService.getSponsors().subscribe((res) => {
      this.sponsors = res.map((e) => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object),
        } as Sponsor;
      });
    });
  }

  setLogo(files: any) {
    this.logo = files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewLogoUrl = event.target.result;
    };
    reader.readAsDataURL(this.logo);
  }

  resetForm() {
    this.addSponsorForm.reset();
    this.previewLogoUrl = "";
    this.updateSponsorId = "";
    this.mainButtonText = "Add Sponsor";
    this.imageChangedEvent = null;
  }

  manageSponsor() {
    if (this.mainButtonText.startsWith("Update")) {
      if (this.logo === null) {
        const newSponsor = {
          id: this.updateSponsorId,
          name: this.addSponsorForm.get("name").value,
          link: this.addSponsorForm.get("link").value,
          logoUrl: this.previewLogoUrl,
          tier: this.addSponsorForm.get("tier").value,
          logo: null,
        };
        let promise = this.sponsorService.updateSponsor(newSponsor);
        this.updateSponsorNotification(promise);
      } else {
        const sponsorId = this.updateSponsorId;
        const sponsorName = this.addSponsorForm.get("name").value;
        const sponsorLink = this.addSponsorForm.get("link").value;
        const sponsorTier = this.addSponsorForm.get("tier").value;
        this.uploadService
          .uploadFile(this.logo, "assets/logos/")
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadUrl) => {
              const newSponsor = {
                id: sponsorId,
                name: sponsorName,
                link: sponsorLink,
                logoUrl: downloadUrl,
                tier: sponsorTier,
                logo: null,
              };
              let promise = this.sponsorService.updateSponsor(newSponsor);
              this.updateSponsorNotification(promise);
            });
          });
      }
      this.resetForm();
      return;
    }
    const sponsorName = this.addSponsorForm.get("name").value;
    const sponsorLink = this.addSponsorForm.get("link").value;
    const sponsorTier = this.addSponsorForm.get("tier").value;
    this.uploadService
      .uploadFile(this.logo, "assets/logos/")
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((downloadUrl) => {
          const newSponsor = {
            name: sponsorName,
            link: sponsorLink,
            logoUrl: downloadUrl,
            tier: sponsorTier,
            logo: null,
          };
          let promise = this.sponsorService.addSponsor(newSponsor);
          this.addSponsorNotification(promise);
        });
      });
    this.resetForm();
  }

  deleteSponsor(sponsor: Sponsor) {
    let promise = this.sponsorService.deleteSponsor(sponsor);
    this.removeSponsorNotification(promise);
  }

  setupSponsorUpdate(sponsor: Sponsor) {
    this.updateSponsorId = sponsor.id;
    this.addSponsorForm.get("name").setValue(sponsor.name);
    this.addSponsorForm.get("link").setValue(sponsor.link);
    this.addSponsorForm.get("tier").setValue(sponsor.tier);
    this.previewLogoUrl = sponsor.logoUrl;
    this.logo = null;
    this.mainButtonText = "Update Sponsor";
    document.documentElement.scrollTop = 0;
  }

  showActionHistory(sponsor: Sponsor) {
    this.actionHistory = [];
    this.userActionService.getEntityActions(sponsor.id).then((userActions) => {
      userActions.forEach((doc) => {
        this.actionHistory.push({
          id: doc.id,
          ...(doc.data() as object),
        } as UserAction);
      });
    });
    document.documentElement.scrollTop = 0;
  }
}
