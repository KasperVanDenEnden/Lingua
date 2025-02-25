import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LocationListComponent } from './location/location-list/location-list.component';
import { LocationDetailComponent } from './location/location-detail/location-detail.component';
import { LocationFormComponent } from './location/location-form/location-form.component';

@NgModule({
  imports: [
    CommonModule,
    PagesComponent,
    LoginComponent,
    RegisterComponent,
    LocationListComponent,
    LocationDetailComponent,
    LocationFormComponent,
  ],
  exports: [
    PagesComponent,
    LoginComponent,
    RegisterComponent,
    LocationListComponent,
    LocationDetailComponent,
    LocationFormComponent,
  ]
})
export class PagesModule { }
