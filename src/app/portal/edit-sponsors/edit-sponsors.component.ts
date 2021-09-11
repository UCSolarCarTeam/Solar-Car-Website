import { Component, OnInit } from '@angular/core';

import { SponsorService } from 'src/app/services/sponsor.service';
import { Sponsor } from 'src/app/models/sponsor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileUploadService } from 'src/app/services/file-upload.service';

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

  constructor(private sponsorService: SponsorService, private uploadService: FileUploadService, private formBuilder: FormBuilder) {
    this.addSponsorForm = this.formBuilder.group({
      name: [''],
      link: [''],
      logo: [''],
      tier: ['']
    });
    this.mainButtonText = 'Add Sponsor';
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
        this.sponsorService.updateSponsor(newSponsor);
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
            this.sponsorService.updateSponsor(newSponsor);
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
        this.sponsorService.addSponsor(newSponsor);
      });
    });
    this.resetForm();
  }

  deleteSponsor(id: string) {
    this.sponsorService.deleteSponsor(id);
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
}
