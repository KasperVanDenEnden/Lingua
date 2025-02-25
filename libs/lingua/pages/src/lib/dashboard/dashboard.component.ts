import { Component } from '@angular/core';
import { PagesModule } from '../pages.module';

@Component({
  selector: 'lingua-dashboard',
  imports: [PagesModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
