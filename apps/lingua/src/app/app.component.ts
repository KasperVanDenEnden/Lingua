import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent, NavComponent } from '@lingua/common';
import { PagesModule } from '@lingua/pages';

@Component({
  imports: [RouterModule, PagesModule, NavComponent, FooterComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'lingua';
}
