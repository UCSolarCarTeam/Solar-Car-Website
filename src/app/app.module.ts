import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { SupportUsComponent } from './support-us/support-us.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { NewsComponent } from './news/news.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TeamComponent } from './team/team.component';
import { SocialMediaComponent } from './common/social-media/social-media.component';
import { CarsInfoComponent } from './cars/cars-info/cars-info.component';
import { HeaderComponent } from './header/header.component';
import { HeaderLinksComponent } from './header/header-links/header-links.component';
import { HeaderHambugerMenuComponent } from './header/header-hambuger-menu/header-hambuger-menu.component';
import { CaptainComponent } from './team/captain/captain.component';
import { MembersComponent } from './team/members/members.component';
import { GalleryItemComponent } from './team/members/gallery-item/gallery-item.component';
import { ElysiaComponent } from './elysia/elysia.component';


@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    SupportUsComponent,
    SponsorsComponent,
    NewsComponent,
    ContactUsComponent,
    TeamComponent,
    SocialMediaComponent,
    CarsInfoComponent,
    HeaderComponent,
    HeaderLinksComponent,
    HeaderHambugerMenuComponent,
    CaptainComponent,
    MembersComponent,
    GalleryItemComponent,
    ElysiaComponent,
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCHcMfciASJU5gIbUuAa2lNCekB76fbPaE',
      libraries: ['places', 'geometry']
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
