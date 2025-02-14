// import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'lingua-nav',
  // imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent  {
  isMobileMenuOpen = false;
  isProductMenuOpen = false;
  isProductFlyoutOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleProductMenu() {
    this.isProductMenuOpen = !this.isProductMenuOpen;
  }

  toggleProductFlyout() {
    this.isProductFlyoutOpen = !this.isProductFlyoutOpen;
  }
}
