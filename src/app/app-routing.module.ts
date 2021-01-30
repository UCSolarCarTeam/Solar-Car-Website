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


const routes: Routes = [
    { path: 'elysia', component: ElysiaComponent},
    { path: 'cars', component: CarsComponent },
    { path: 'support-us', component: SupportUsComponent },
    { path: 'sponsors', component: SponsorsComponent },
    { path: 'news', component: NewsComponent },
    { path: 'team', component: TeamComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'news/:link', component: ArticleComponent},
    { path: '', component: MainComponent },
    { path: '**', redirectTo: 'main', pathMatch: 'full' }
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
