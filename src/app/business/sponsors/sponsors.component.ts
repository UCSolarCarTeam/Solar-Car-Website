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
      res.forEach(e => {
        const sponsor = {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as object)
        } as Sponsor;

        switch (sponsor.tier) {
          case 'Lead':
            // only push to array if the sponsor doesn't already exist
            if (this.lead.findIndex(existingSponsor => existingSponsor.id === sponsor.id) == -1)
              this.lead.push(sponsor);
            else
            break;
          case 'Platinum':
            if (this.platinum.findIndex(existingSponsor => existingSponsor.id === sponsor.id) == -1)
              this.platinum.push(sponsor);
            break;
          case 'Gold':
            if (this.gold.findIndex(existingSponsor => existingSponsor.id === sponsor.id) == -1)
              this.gold.push(sponsor);
            break;
          case 'Silver':
            if (this.silver.findIndex(existingSponsor => existingSponsor.id === sponsor.id) == -1)
              this.silver.push(sponsor);
            break;
          case 'Bronze':
            if (this.bronze.findIndex(existingSponsor => existingSponsor.id === sponsor.id) == -1)
              this.bronze.push(sponsor);
            break;
          case 'Friend':
            if (this.friends.findIndex(existingSponsor => existingSponsor.id === sponsor.id) == -1)
              this.friends.push(sponsor);
            break;
        }
      });
    });
  }

}
