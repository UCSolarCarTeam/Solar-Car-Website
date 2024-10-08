import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal.component';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';
import { EditNewsComponent } from './edit-news/edit-news.component';
import { EditSponsorsComponent } from './edit-sponsors/edit-sponsors.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      {path: 'manage-news', component: EditNewsComponent, canActivate: [AuthGuard]},
      {path: 'manage-sponsors', component: EditSponsorsComponent, canActivate: [AuthGuard]},
      {path: 'manage-team', component: EditTeamComponent, canActivate: [AuthGuard]},
      {path: 'manage-inventory', component: EditInventoryComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
      {path: 'user', component: UserProfileComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: 'user', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PortalRoutingModule { }
