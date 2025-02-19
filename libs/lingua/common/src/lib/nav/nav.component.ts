import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DropdownComponent } from './dropdown/dropdown.component';
import { Subscription } from 'rxjs';
import { IUser, Role } from '@lingua/api';
import { AuthService } from '@lingua/pages';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'lingua-nav',
  imports: [DropdownComponent, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit, OnDestroy  {
  isMobileMenuOpen = false;
  isLocationMenuOpen = false;
  isLocationFlyoutOpen = false;

  userSub!: Subscription;
  currentUser: IUser | undefined;
  email: string | undefined;
  role: string | undefined;

  constructor(
    @Inject(AuthService) public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.getUserFromLocalStorage().subscribe(
      (user:  IUser | null) => {
        console.log(user, 'localUser in component');
        if (user) {
          const { role, email } = user;
          this.role = role;
          this.email = email;
        }
      },
      (error) => {
        console.error(error);
      }
    );

    this.userSub = this.auth.currentUser$.subscribe({
      next: (user) => {
        this.currentUser = user;
      },
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleLocationMenu() {
    this.isLocationMenuOpen = !this.isLocationMenuOpen;
  }

  toggleLocationFlyout() {
    this.isLocationFlyoutOpen = !this.isLocationFlyoutOpen;
  }

  logout() {
    this.auth.logout();
    
  }
}
