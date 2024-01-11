import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MarkdownModule } from "ngx-markdown";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { BusinessRoutingModule } from "./business-routing.module";
import { BusinessComponent } from "./business.component";
import { CarsComponent } from "./cars/cars.component";
import { SupportUsComponent } from "./support-us/support-us.component";
import { SponsorsComponent } from "./sponsors/sponsors.component";
import { NewsComponent } from "./news/news.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { TeamComponent } from "./team/team.component";
import { SocialMediaComponent } from "./common/social-media/social-media.component";
import { CarsInfoComponent } from "./cars/cars-info/cars-info.component";
import { HeaderComponent } from "./header/header.component";
import { HeaderLinksComponent } from "./header/header-links/header-links.component";
import { CaptainComponent } from "./team/captain/captain.component";
import { MembersComponent } from "./team/members/members.component";
import { GalleryItemComponent } from "./team/members/gallery-item/gallery-item.component";
import { MainComponent } from "./main/main.component";
import { PostComponent } from "./news/post/post.component";
import { ArticleComponent } from "./news/article/article.component";
import { ElysiaComponent } from "./elysia/elysia.component";
import { FooterComponent } from "./footer/footer.component";
// import { RecruitmentComponent } from './recruitment/recruitment.component';

@NgModule({
  declarations: [
    BusinessComponent,
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
    CaptainComponent,
    MembersComponent,
    GalleryItemComponent,
    MainComponent,
    PostComponent,
    ArticleComponent,
    ElysiaComponent,
    FooterComponent,
    // RecruitmentComponent,
  ],
  imports: [
    CommonModule,
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyCHcMfciASJU5gIbUuAa2lNCekB76fbPaE",
    //   libraries: ["places", "geometry"],
    // }),
    BusinessRoutingModule,
    FontAwesomeModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatPaginatorModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
  providers: [],
  bootstrap: [BusinessComponent],
})
export class BusinessModule {}
