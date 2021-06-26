import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal.component';
import { MainComponent } from './main/main.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { EditSponsorsComponent } from './edit-sponsors/edit-sponsors.component';
import { EditTeamComponent } from './edit-team/edit-team.component';

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      {path: 'manage-news', component: EditNewsComponent},
      {path: 'manage-sponsors', component: EditSponsorsComponent},
      {path: 'manage-team', component: EditTeamComponent},
      { path: '', component: MainComponent },
      {path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PortalRoutingModule { }
