import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'portal-root',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnDestroy {
  constructor(private authService: AuthService) { }

  async ngOnDestroy() {
    await this.authService.LogOut();
  }
}
