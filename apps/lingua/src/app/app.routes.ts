import { Route } from '@angular/router';
import { LoginComponent, PagesComponent, RegisterComponent } from '@lingua/pages';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', component: NxWelcomeComponent },
    { path: 'pages', pathMatch: 'full', component: PagesComponent },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent },
    
];
