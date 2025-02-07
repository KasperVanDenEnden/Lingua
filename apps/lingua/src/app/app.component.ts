import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { PagesModule } from '@lingua/pages';

@Component({
  imports: [NxWelcomeComponent, RouterModule, PagesModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lingua';
}
