import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { EditSponsorsComponent } from './edit-sponsors/edit-sponsors.component';
import { EditNewsComponent } from './edit-news/edit-news.component';

import { ReactiveFormsModule } from '@angular/forms'; 
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    PortalComponent,
    HeaderComponent,
    MainComponent,
    EditTeamComponent,
    EditSponsorsComponent,
    EditNewsComponent,
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    AngularFirestoreModule,  
    ReactiveFormsModule  
  ],
  providers: [
    {
      provide: FIRESTORE_SETTINGS, useValue: environment.useEmulators ? { host: 'localhost:8080', ssl: false } : {}
    }
  ],
  bootstrap: [PortalComponent]
})
export class PortalModule { }
