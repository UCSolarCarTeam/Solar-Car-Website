import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SponsorComponent } from './components/support-us-page/sponsor/sponsor.component';
import { DonateComponent } from './components/support-us-page/donate/donate.component';
import { InKindDonationsComponent } from './components/support-us-page/in-kind-donations/in-kind-donations.component';
import { SocialMediaComponent } from './components/common/social-media/social-media.component';
import { SupportUsMainComponent } from './components/support-us-page/support-us-main/support-us-main.component';

@NgModule({
  declarations: [
    AppComponent,
    SupportUsMainComponent,
    SponsorComponent,
    DonateComponent,
    InKindDonationsComponent,
    SocialMediaComponent,
    SupportUsMainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
