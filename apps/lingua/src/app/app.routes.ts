import { Route } from '@angular/router';
import { PagesComponent } from '@lingua/pages';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', component: NxWelcomeComponent },
    { path: 'pages', pathMatch: 'full', component: PagesComponent },
    
];
