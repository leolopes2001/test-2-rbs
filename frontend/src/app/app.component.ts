import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet]
})
export class AppComponent {
  isAuthenticated$: Observable<boolean>; 
  isAuthenticated: boolean = false; 
  
  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit() {
    this.isAuthenticated$.subscribe(value => {
      this.isAuthenticated = value; 
    });
  }

  logout(): void {
    this.authService.logout(); // Método para realizar logout
    this.router.navigate(['/login']); // Redireciona para a página de login após logout
  }
}
