import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './business/cars/cars.component';
import { SupportUsComponent } from './business/support-us/support-us.component';
import { SponsorsComponent } from './business/sponsors/sponsors.component';
import { NewsComponent } from './business/news/news.component';
import { ContactUsComponent } from './business/contact-us/contact-us.component';
import { TeamComponent } from './business/team/team.component';
import { MainComponent } from './business/main/main.component';
import { ArticleComponent } from './business/news/article/article.component';
import { ElysiaComponent } from './business/elysia/elysia.component';

const routes: Routes = [
  { path: 'portal', loadChildren: () => import('./portal/portal.module').then(m => m.PortalModule) },
  { path: '', loadChildren: () => import('./business/business.module').then(m => m.BusinessModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
