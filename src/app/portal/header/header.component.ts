import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'portal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  businessRouteLinks: any[];
  engineeringRouteLinks: any[];

  constructor(private auth: AuthService) {
    this.businessRouteLinks = [
      {
        label: 'Team',
        link: 'manage-team',
      },
      {
        label: 'Sponsors',
        link: 'manage-sponsors',
      },
      {
        label: 'News',
        link: 'manage-news',
      }
    ];
    this.engineeringRouteLinks = [
      {
        label: 'Inventory',
        link: 'manage-inventory',
      }
    ];
  }

  public LoggedIn(): boolean {
    const user = JSON.parse(window.sessionStorage.getItem('User'));
    return user !== null && user.verified;
  }

  public getAuth() {
    return this.auth;
  }
}
