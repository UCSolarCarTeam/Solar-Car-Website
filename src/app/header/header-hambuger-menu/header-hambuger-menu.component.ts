import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-hambuger-menu',
  templateUrl: './header-hambuger-menu.component.html',
  styleUrls: ['./header-hambuger-menu.component.css']
})
export class HeaderHambugerMenuComponent {
  @Input() routeLinks: any[];
  isOpen = false;

  constructor() { }

  toggleHamburgerMenuVisibility(): void {
    this.isOpen = !this.isOpen;
  }
}
