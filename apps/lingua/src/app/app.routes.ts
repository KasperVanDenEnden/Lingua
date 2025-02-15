import { Route, RouterModule } from '@angular/router';
import { DashboardComponent, LoginComponent, PagesComponent, RegisterComponent } from '@lingua/pages';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@lingua/pages';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', component: NxWelcomeComponent },
    { path: 'pages', pathMatch: 'full', component: PagesComponent, canActivate: [AuthGuard] },
    { path: 'login', pathMatch: 'full', component: LoginComponent },
    { path: 'register', pathMatch: 'full', component: RegisterComponent },
    { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
    { path: 'classes', pathMatch: 'full', component: NxWelcomeComponent },
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
