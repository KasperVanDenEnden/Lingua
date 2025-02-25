import { Component } from '@angular/core';
import { PagesModule } from '../pages.module';

@Component({
  selector: 'lingua-pages',
  imports: [PagesModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css',
})
export class PagesComponent {}
