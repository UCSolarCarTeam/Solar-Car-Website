import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

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
import { CaptainComponent } from './team/captain/captain.component';
import { MembersComponent } from './team/members/members.component';
import { GalleryItemComponent } from './team/members/gallery-item/gallery-item.component';
import { MainComponent } from './business/main/main.component';
import { PostComponent } from './news/post/post.component';
import { ArticleComponent } from './news/article/article.component';
import { ElysiaComponent } from './elysia/elysia.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
