import { Component, Input, OnInit } from '@angular/core';

import { SponsorService } from 'src/app/services/sponsor.service';
import { Sponsor } from 'src/app/models/sponsor';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-edit-sponsors',
  templateUrl: './edit-sponsors.component.html',
  styleUrls: ['./edit-sponsors.component.css']
})
export class EditSponsorsComponent implements OnInit {
  form: FormGroup;
  @Input() sponsors: Sponsor[];

  constructor(private sponsorService: SponsorService) {
    this.form = new FormGroup({
      name: new FormControl(''),
      link: new FormControl(''),
      logo: new FormControl(''),
      tier: new FormControl('')
    })
  }

  ngOnInit(): void { }

}
