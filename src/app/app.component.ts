import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  routeLinks: any[];
  activeLinkIndex = -1;
  isOpen = false;

  constructor(
    private router: Router
  ) {
    this.routeLinks = [
      {
        label: '\xa0\xa0Cars\xa0\xa0\xa0',
        link: './cars',
        index: 0
      },
      {
        label: '\xa0Support Us\xa0\xa0',
        link: './support-us',
        index: 1
      },
      {
        label: '\xa0\xa0\xa0Sponsors\xa0\xa0\xa0\xa0',
        link: './sponsors',
        index: 2
      },
      {
        label: '\xa0\xa0News\xa0\xa0\xa0\xa0',
        link: './news',
        index: 3
      },
      {
        label: '\xa0\xa0Team\xa0\xa0\xa0\xa0',
        link: './team',
        index: 4
      },
      {
        label: 'Contact Us\xa0\xa0\xa0\xa0\xa0',
        link: './contact-us',
        index: 5
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(
        this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  getActiveClass(indexofRouteLink) {
    let tabsclass = 'mat-tab-link';
    if (this.activeLinkIndex === indexofRouteLink) {
      tabsclass = 'mat-tab-link mat-tab-label-active';
    }
    return tabsclass;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }
}

