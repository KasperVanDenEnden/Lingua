import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PagesModule } from '@lingua/pages';

@Component({
  imports: [RouterModule, PagesModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lingua';
}
