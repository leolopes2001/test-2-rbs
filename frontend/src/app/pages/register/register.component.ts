import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, CommonModule] 
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password');
    const passwordConfirmation = formGroup.get('passwordConfirmation');

    if (password && passwordConfirmation) {
      if (password.value !== passwordConfirmation.value) {
        passwordConfirmation.setErrors({ mustMatch: true });
      } else {
        passwordConfirmation.setErrors(null);
      }
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const { name, email, password, passwordConfirmation } = this.registerForm.value;

    this.authService.register(name, email, password, passwordConfirmation).subscribe({
      next: (response) => {
        this.router.navigate([this.authService.isAuthenticated() ? '/usuarios' : '/login']);
      },
      error: (response) => {
        this.handleServerErrors(response.error.data as []);
      }
    });
  }

  handleServerErrors(errors: any): void {
    if (errors) {
      this.registerForm.setErrors(null);

      for (const field in errors) {
        if (errors.hasOwnProperty(field)) {

          const control = this.registerForm.get(field);
          
          if (control) {
            control.setErrors({ serverError: errors[field][0] });
          }
        }
      }

      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
    }
  }
}