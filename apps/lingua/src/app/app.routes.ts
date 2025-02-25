import { Route, RouterModule } from '@angular/router';
import {
  ClassDetailComponent,
  ClassFormComponent,
  ClassListComponent,
  DashboardComponent,
  LessonDetailComponent,
  LessonFormComponent,
  LessonListComponent,
  LocationDetailComponent,
  LocationFormComponent,
  LocationListComponent,
  LoginComponent,
  PagesComponent,
  RegisterComponent,
  RoomDetailComponent,
  RoomFormComponent,
  RoomListComponent,
} from '@lingua/pages';
import { NgModule } from '@angular/core';
import { AuthGuard, RolesGuard } from '@lingua/pages';
import { CommonComponent } from '@lingua/common';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RolesGuard],
  },
  {
    path: 'locations',
    component: LocationListComponent,
    canActivate: [AuthGuard, RolesGuard],
    children: [
      {
        path: 'new',
        pathMatch: 'full',
        component: LocationFormComponent,
        canActivate: [RolesGuard],
        data: { role: 'teacher' },
      },
    ],
  },
  {
    path: 'locations/:id',
    canActivate: [AuthGuard],
    component: LocationDetailComponent,
    children: [
      {
        path: 'edit',
        pathMatch: 'full',
        component: LocationFormComponent,
        canActivate: [RolesGuard],
        data: { role: 'teacher' },
      },
    ],
  },
  {
    path: 'rooms',
    component: RoomListComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'new',
        pathMatch: 'full',
        component: RoomFormComponent,
        canActivate: [RolesGuard],
        data: { role: 'teacher' },
      },
    ],
  },
  {
    path: 'rooms/:id',
    canActivate: [AuthGuard],
    component: RoomDetailComponent,
    children: [
      {
        path: 'edit',
        pathMatch: 'full',
        component: RoomFormComponent,
        canActivate: [RolesGuard],
        data: { role: 'teacher' },
      },
    ],
  },
  {
    path: 'classes',
    component: ClassListComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'new',
        pathMatch: 'full',
        component: ClassFormComponent,
        canActivate: [RolesGuard],
        data: { role: 'teacher' },
      },
    ],
  },
  {
    path: 'classes/:id',
    canActivate: [AuthGuard],
    component: ClassDetailComponent,
    children: [
      {
        path: 'edit',
        pathMatch: 'full',
        component: ClassFormComponent,
        canActivate: [RolesGuard],
        data: { role: 'teacher' },
      },
    ],
  },
  {
    path: 'lessons',
    component: LessonListComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'new',
        pathMatch: 'full',
        component: LessonFormComponent,
        canActivate: [RolesGuard],
        data: { role: 'teacher' },
      },
    ],
  },
  {
    path: 'lessons/:id',
    canActivate: [AuthGuard],
    component: LessonDetailComponent,
    children: [
      {
        path: 'edit',
        pathMatch: 'full',
        component: LessonFormComponent,
        canActivate: [RolesGuard],
        data: { role: 'teacher' },
      },
    ],
  },
  { path: 'pages', component: PagesComponent },
  { path: 'access-denied', component: CommonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
