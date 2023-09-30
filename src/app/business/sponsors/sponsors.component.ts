import { Component, OnInit } from '@angular/core';
import { SponsorService } from 'src/app/services/sponsor.service';
import { Sponsor } from 'src/app/models/sponsor';

@Component({
  selector: 'business-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})

export class SponsorsComponent implements OnInit {

  lead: Sponsor[];
  platinum: Sponsor[];
  gold: Sponsor[];
  silver: Sponsor[];
  bronze: Sponsor[];
  friends: Sponsor[];

  constructor(private sponsorService: SponsorService) { }

  ngOnInit() {
    this.lead = [];
    this.platinum = [];
    this.gold = [];
    this.silver = [];
    this.bronze = [];
    this.friends = [];

    this.sponsorService.getSponsors().subscribe(res => {
      this.lead = [];
      this.platinum = [];
      this.gold = [];
      this.silver = [];
      this.bronze = [];
      this.friends = [];

      res.forEach(e => {
        const sponsor = {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as Sponsor;

        switch (sponsor.tier) {
          case 'Lead':
            this.lead.push(sponsor);
            break;
          case 'Platinum':
            this.platinum.push(sponsor);
            break;
          case 'Gold':
            this.gold.push(sponsor);
            break;
          case 'Silver':
            this.silver.push(sponsor);
            break;
          case 'Bronze':
            this.bronze.push(sponsor);
            break;
          case 'Friend':
            this.friends.push(sponsor);
            break;
        }
      });
    });
  }

}
