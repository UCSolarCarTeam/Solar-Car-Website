import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { SupportUsComponent } from './support-us/support-us.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { NewsComponent } from './news/news.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TeamComponent } from './team/team.component';
import { MainComponent } from './main/main.component';
import { ArticleComponent } from './news/article/article.component';
import { ElysiaComponent } from './elysia/elysia.component';
import { BusinessComponent } from './business.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';


const routes: Routes = [
  {
    path: '',
    component: BusinessComponent,
    children: [
      { path: 'elysia', component: ElysiaComponent },
      { path: 'cars', component: CarsComponent },
      { path: 'support-us', component: SupportUsComponent },
      { path: 'sponsors', component: SponsorsComponent },
      { path: 'news', component: NewsComponent },
      { path: 'team', component: TeamComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'news/:id', component: ArticleComponent },
      { path: 'recruitment', component: RecruitmentComponent},
      { path: '', component: MainComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BusinessRoutingModule { }
