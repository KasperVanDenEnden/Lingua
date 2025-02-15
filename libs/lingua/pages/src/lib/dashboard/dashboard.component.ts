import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@lingua/ui';

@Component({
  selector: 'lingua-dashboard',
  imports: [CommonModule, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
