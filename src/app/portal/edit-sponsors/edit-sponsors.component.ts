import { Component, Input, OnInit } from '@angular/core';

import { SponsorService } from 'src/app/services/sponsor.service';
import { Sponsor } from 'src/app/models/sponsor';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-sponsors',
  templateUrl: './edit-sponsors.component.html',
  styleUrls: ['./edit-sponsors.component.css']
})
export class EditSponsorsComponent implements OnInit {
  addSponsorForm: FormGroup;
  sponsors: Sponsor[];

  constructor(private sponsorService: SponsorService, private formBuilder: FormBuilder) {
    this.addSponsorForm = this.formBuilder.group({
      name: [''],
      link: [''],
      logo: [''],
      tier: ['']
    });
  }

  ngOnInit(): void {
    this.sponsorService.getSponsors().subscribe(res => {
      this.sponsors = res.map( e => {
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as Sponsor;
      });
    });
  }

  addSponsor() {
    this.sponsorService.addSponsor(this.addSponsorForm.value);
  }

  deleteSponsor(id) {
    this.sponsorService.deleteSponsor(id);
  }
}
