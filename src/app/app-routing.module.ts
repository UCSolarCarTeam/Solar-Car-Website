import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportUsMainComponent } from './components/support-us-page/support-us-main/support-us-main.component';

const routes: Routes = [
 { path: 'support-us', component: SupportUsMainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
