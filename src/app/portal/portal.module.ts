import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { EditSponsorsComponent } from './edit-sponsors/edit-sponsors.component';
import { EditNewsComponent } from './edit-news/edit-news.component';

import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';


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
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [PortalComponent]
})
export class PortalModule { }
