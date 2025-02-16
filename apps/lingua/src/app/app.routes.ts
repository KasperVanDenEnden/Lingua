import { Route, RouterModule } from '@angular/router';
import { DashboardComponent, LoginComponent, PagesComponent, RegisterComponent } from '@lingua/pages';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@lingua/pages';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', component: NxWelcomeComponent },
    { path: 'pages', component: PagesComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'classes', component: NxWelcomeComponent, canActivate: [AuthGuard] },
    
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
