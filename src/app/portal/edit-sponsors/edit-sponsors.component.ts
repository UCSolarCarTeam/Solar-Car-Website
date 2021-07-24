import { Component, Input, OnInit } from '@angular/core';

import { SponsorService } from 'src/app/services/sponsor.service';
import { Sponsor } from 'src/app/models/sponsor';
import { FormBuilder, FormGroup } from "@angular/forms";
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-edit-sponsors',
  templateUrl: './edit-sponsors.component.html',
  styleUrls: ['./edit-sponsors.component.css']
})
export class EditSponsorsComponent implements OnInit {
  addSponsorForm: FormGroup;
  sponsors: Sponsor[];
  filePath: string;

  constructor(private sponsorService: SponsorService, private uploadService: FileUploadService, private formBuilder: FormBuilder) {
    this.addSponsorForm = this.formBuilder.group({
      name: [''],
      link: [''],
      logo: [''],
      tier: ['']
    })
  }

  ngOnInit(): void {
    this.sponsorService.getSponsors().subscribe(res => {
      this.sponsors = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Object)
        } as Sponsor;
      })
    })
  }

  async uploadLogo(event) {
    const file = event.target.files[0];
    this.filePath = await this.uploadService.uploadFile(file);
  }

  async addSponsor() {
    let sponsor = { id: '',
                    name: this.addSponsorForm.get('name').value,
                    link: this.addSponsorForm.get('link').value,
                    logo: null,
                    logoUrl: this.filePath,
                    tier: this.addSponsorForm.get('tier').value};
    this.sponsorService.addSponsor(sponsor);
  }

  deleteSponsor(id) {
    this.sponsorService.deleteSponsor(id);
  }
}
