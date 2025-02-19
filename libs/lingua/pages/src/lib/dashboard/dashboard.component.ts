import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinguaCommonModule } from '@lingua/common';

@Component({
  selector: 'lingua-dashboard',
  imports: [CommonModule, LinguaCommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
