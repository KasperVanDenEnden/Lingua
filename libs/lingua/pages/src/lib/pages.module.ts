import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    PagesComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [PagesComponent]
})
export class PagesModule { }
