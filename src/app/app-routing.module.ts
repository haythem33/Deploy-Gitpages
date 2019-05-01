<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];
=======
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProfilconsultantComponent } from './profilconsultant/profilconsultant.component';
import { ProfilelistComponent } from './profilelist/profilelist.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';


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
    path: 'profilconsultant',
    component: ProfilconsultantComponent
  },
  {
    path: 'profilelist',
    component: ProfilelistComponent
  },
  {
    path : 'chatbox',
    component : ChatboxComponent
  },
  {
    path : 'viewprofile',
    component : ViewprofileComponent
  }
];
>>>>>>> e41ee4ab29552ac61e451d643d51a6239d86b8c6

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
