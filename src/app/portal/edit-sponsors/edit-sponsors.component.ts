import { Component, OnInit } from '@angular/core';

import { SponsorService } from 'src/app/services/sponsor.service';
import { Sponsor } from 'src/app/models/sponsor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserActionService } from 'src/app/services/user-action.service';
import { UserAction } from 'src/app/models/user-action';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-sponsors',
  templateUrl: './edit-sponsors.component.html',
  styleUrls: ['./edit-sponsors.component.css']
})
export class EditSponsorsComponent implements OnInit {
  addSponsorForm: FormGroup;
  sponsors: Sponsor[];
  previewLogoUrl: string;
  mainButtonText: string;
  logo: File;
  updateSponsorId: string;
  tiers = [
    'Lead',
    'Platinum',
    'Gold',
    'Silver',
    'Bronze',
    'Friend'
  ];
  actionHistory: UserAction[];

  constructor(private sponsorService: SponsorService, private uploadService: FileUploadService, private formBuilder: FormBuilder,
      private authService: AuthService, private userActionService: UserActionService, private userService: UserService) {
    this.addSponsorForm = this.formBuilder.group({
      name: [''],
      link: [''],
      logo: [''],
      tier: ['']
    });
    this.mainButtonText = 'Add Sponsor';
    this.actionHistory = [];
  }

  ngOnInit(): void {
    this.sponsorService.getSponsors().subscribe(res => {
      this.sponsors = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
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
    this.previewLogoUrl = '';
    this.updateSponsorId = '';
    this.mainButtonText = 'Add Sponsor';
  }

  manageSponsor() {
    if (this.mainButtonText.startsWith('Update')) {
      if (this.logo == null) {
        const newSponsor = {
          id: this.updateSponsorId,
          name: this.addSponsorForm.get('name').value,
          link: this.addSponsorForm.get('link').value,
          logoUrl: this.previewLogoUrl,
          tier: this.addSponsorForm.get('tier').value,
          logo: null
        };
        this.sponsorService.updateSponsor(newSponsor, this.authService.user);
      } else {
        const sponsorId = this.updateSponsorId;
        const sponsorName = this.addSponsorForm.get('name').value;
        const sponsorLink = this.addSponsorForm.get('link').value;
        const sponsorTier = this.addSponsorForm.get('tier').value;
        this.uploadService.uploadFile(this.logo, 'assets/logos/').then((snapshot) => {
          snapshot.ref.getDownloadURL().then((downloadUrl) => {
            const newSponsor = {
              id: sponsorId,
              name: sponsorName,
              link: sponsorLink,
              logoUrl: downloadUrl,
              tier: sponsorTier,
              logo: null
            };
            this.sponsorService.updateSponsor(newSponsor, this.authService.user);
          });
        });
      }
      this.resetForm();
      return;
    }
    const sponsorName = this.addSponsorForm.get('name').value;
    const sponsorLink = this.addSponsorForm.get('link').value;
    const sponsorTier = this.addSponsorForm.get('tier').value;
    this.uploadService.uploadFile(this.logo, 'assets/logos/').then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadUrl) => {
        const newSponsor = {
          name: sponsorName,
          link: sponsorLink,
          logoUrl: downloadUrl,
          tier: sponsorTier,
          logo: null
        };
        this.sponsorService.addSponsor(newSponsor, this.authService.user);
      });
    });
    this.resetForm();
  }

  deleteSponsor(sponsor: Sponsor) {
    this.sponsorService.deleteSponsor(sponsor, this.authService.user);
  }

  setupSponsorUpdate(sponsor: Sponsor) {
    this.updateSponsorId = sponsor.id;
    this.addSponsorForm.get('name').setValue(sponsor.name);
    this.addSponsorForm.get('link').setValue(sponsor.link);
    this.addSponsorForm.get('tier').setValue(sponsor.tier);
    this.previewLogoUrl = sponsor.logoUrl;
    this.logo = null;
    this.mainButtonText = 'Update Sponsor';
  }

  showActionHistory(sponsor: Sponsor) {
    this.actionHistory = [];
    this.userActionService.getEntityActions(sponsor.id).then(userActions => {
      userActions.forEach((doc) => {
        this.actionHistory.push({
          id: doc.id,
          ...doc.data() as object
        } as UserAction);
        let action = this.actionHistory.pop();
        this.userService.getUser(action.uid).subscribe(doc => {
          const user = doc.data() as User;
          action.uid = user.displayName;
          this.sponsorService.getSponsor(action.eid).subscribe(doc => {
            const sponsor = doc.data() as Sponsor;
            action.eid = sponsor.name;
            this.actionHistory.push(action);
          });
        });
        console.log(this.actionHistory);
      });
    });
    document.documentElement.scrollTop = 0;
  }
}
