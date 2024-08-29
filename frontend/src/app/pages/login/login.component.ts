import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, CommonModule] 
})
export class LoginComponent {
  loginForm: FormGroup; 

  errorMessage: string | null = null; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password)
        .subscribe({
          next: () => {
            this.router.navigate(['/usuarios'])
          },
          error: (err) => {
            console.error('Login error', err);
            this.errorMessage = 'Falha no login. Verifique suas credenciais e tente novamente.';

          }
        });
    }
  }
}
