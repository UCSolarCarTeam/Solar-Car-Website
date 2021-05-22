import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { SupportUsComponent } from './support-us/support-us.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { NewsComponent } from './news/news.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TeamComponent } from './team/team.component';
import { MainComponent } from './business/main/main.component';
import { ArticleComponent } from './news/article/article.component';
import { ElysiaComponent } from './elysia/elysia.component';

const routes: Routes = [
  { path: 'portal', loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule) },
  { path: '', loadChildren: () => import('./business/business.module').then(m => m.BusinessModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
