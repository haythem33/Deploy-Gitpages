import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfilconsultantComponent } from './profilconsultant/profilconsultant.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProfilelistComponent } from './profilelist/profilelist.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent
  },
  {
    path: 'profilelist',
    component: ProfilelistComponent
  },
  {
    path: 'profilconsultant',
    component: ProfilconsultantComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
