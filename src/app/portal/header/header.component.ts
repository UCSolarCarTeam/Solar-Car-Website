import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'portal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  routeLinks: any[];

  constructor() {
    this.routeLinks = [
      {
        label: 'Team',
        link: './portal/manage-team',
      },
      {
        label: 'Sponsors',
        link: './portal/manage-sponsors',
      },
      {
        label: 'News',
        link: './portal/manage-news',
      }
    ];
  }

}
