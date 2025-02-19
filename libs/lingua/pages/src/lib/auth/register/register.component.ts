import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ICreateUser } from '@lingua/api';
import { LinguaCommonModule } from '@lingua/common';

@Component({
  selector: 'lingua-register',
  imports: [CommonModule, ReactiveFormsModule, LinguaCommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  subs: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      // pwdRepeat: new FormControl(null, [Validators.required]),
      role: new FormControl('student', [Validators.required]),
    })
  }
  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const data: ICreateUser = {
        email: this.registerForm.value.email,
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        password: this.registerForm.value.password,
        role: this.registerForm.value.role
      }
      console.log(data)

      this.authService.register(data).pipe(
        switchMap((user) => {
          if (user) {
            return this.authService.login(this.registerForm.value.email, this.registerForm.value.password);
          } else {
            throw new Error('Registratie mislukt');
          }
        })
      ).subscribe({
        next: () => {
          console.log('Succesvol geregistreerd en ingelogd!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => console.error('Fout bij registratie/inloggen:', err)
      });
      
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
