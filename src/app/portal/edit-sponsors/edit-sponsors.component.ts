import { Component, Input, OnInit } from '@angular/core';

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
  logo: File;

  constructor(private sponsorService: SponsorService, private uploadService: FileUploadService, private formBuilder: FormBuilder) {
    this.addSponsorForm = this.formBuilder.group({
      name: [''],
      link: [''],
      logo: [''],
      tier: ['']
    });
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
  }

  addSponsor() {
    const thisRef = this;
    this.uploadService.uploadFile(this.logo).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadUrl) => {
        const newSponsor = {
          name: thisRef.addSponsorForm.get('name').value,
          link: thisRef.addSponsorForm.get('link').value,
          logoUrl: downloadUrl,
          tier: thisRef.addSponsorForm.get('tier').value,
          logo: null
        };
        thisRef.sponsorService.addSponsor(newSponsor);
      });
    });
  }

  deleteSponsor(id) {
    this.sponsorService.deleteSponsor(id);
  }
}
