import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { HeaderComponent } from './header/header.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { EditSponsorsComponent } from './edit-sponsors/edit-sponsors.component';
import { EditNewsComponent } from './edit-news/edit-news.component';

import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminPanelComponent } from './user-profile/admin-panel/admin-panel.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import { CropImageComponent } from './crop-image/crop-image.component';


@NgModule({
  declarations: [
    PortalComponent,
    HeaderComponent,
    EditTeamComponent,
    EditSponsorsComponent,
    EditNewsComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    AdminPanelComponent,
    ResetPasswordComponent,
    EditInventoryComponent,
    CropImageComponent,
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [PortalComponent]
})
export class PortalModule { }
