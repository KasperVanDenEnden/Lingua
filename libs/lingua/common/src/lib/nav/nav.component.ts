// import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
  selector: 'lingua-nav',
  imports: [DropdownComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent  {
  isMobileMenuOpen = false;
  isLocationMenuOpen = false;
  isLocationFlyoutOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleLocationMenu() {
    this.isLocationMenuOpen = !this.isLocationMenuOpen;
  }

  toggleLocationFlyout() {
    this.isLocationFlyoutOpen = !this.isLocationFlyoutOpen;
  }
}
