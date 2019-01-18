import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Control } from './control';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ProfilconsultantComponent } from './profilconsultant/profilconsultant.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmationComponent,
    ProfilconsultantComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Control
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
