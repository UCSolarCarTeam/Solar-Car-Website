import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-links',
  templateUrl: './header-links.component.html',
  styleUrls: ['./header-links.component.css']
})
export class HeaderLinksComponent {
  @Input() routeLinks: any[];

  constructor() {}
}
