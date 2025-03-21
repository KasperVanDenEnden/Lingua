import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@lingua/services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PagesModule } from '../../pages.module';

@Component({
  selector: 'lingua-login',
  imports: [PagesModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  subs: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.subs = this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (user) => {
            if (user) {
              const returnUrl =
                this.route.snapshot.queryParamMap.get('returnUrl') || '/';
              this.router.navigate([returnUrl]);
            }
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
