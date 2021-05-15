import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'business-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  routeLinks: any[];

  constructor() {
    this.routeLinks = [
      {
        label: 'Elysia',
        link: './elysia',
      },
      {
        label: 'Cars',
        link: './cars',
      },
      {
        label: 'Team',
        link: './team',
      },
      {
        label: 'Support Us',
        link: './support-us',
      },
      {
        label: 'Sponsors',
        link: './sponsors',
      },
      {
        label: 'News',
        link: './news',
      },
      {
        label: 'Contact Us',
        link: './contact-us',
      }
    ];
  }
}
