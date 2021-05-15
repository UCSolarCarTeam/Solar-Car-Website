import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';

@NgModule({
  declarations: [
    PortalComponent,
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
  ],
  providers: [],
  bootstrap: [PortalComponent]
})
export class PortalModule { }
