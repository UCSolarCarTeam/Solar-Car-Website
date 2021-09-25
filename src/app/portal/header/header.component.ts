import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'portal-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  routeLinks: any[];

  constructor(private auth: AuthService) {
    this.routeLinks = [
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
  }

  public LoggedIn(): boolean {
    return this.auth.isLoggedIn;
  }

  public LogOut() {
    this.auth.LogOut();
  }

}
