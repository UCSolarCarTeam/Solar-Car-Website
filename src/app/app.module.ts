import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './business/cars/cars.component';
import { SupportUsComponent } from './business/support-us/support-us.component';
import { SponsorsComponent } from './business/sponsors/sponsors.component';
import { NewsComponent } from './business/news/news.component';
import { ContactUsComponent } from './business/contact-us/contact-us.component';
import { TeamComponent } from './business/team/team.component';
import { SocialMediaComponent } from './business/common/social-media/social-media.component';
import { CarsInfoComponent } from './business/cars/cars-info/cars-info.component';
import { HeaderComponent } from './business/header/header.component';
import { HeaderLinksComponent } from './business/header/header-links/header-links.component';
import { CaptainComponent } from './business/team/captain/captain.component';
import { MembersComponent } from './business/team/members/members.component';
import { GalleryItemComponent } from './business/team/members/gallery-item/gallery-item.component';
import { MainComponent } from './business/main/main.component';
import { PostComponent } from './business/news/post/post.component';
import { ArticleComponent } from './business/news/article/article.component';
import { ElysiaComponent } from './business/elysia/elysia.component';
import { FooterComponent } from './business/footer/footer.component';

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
