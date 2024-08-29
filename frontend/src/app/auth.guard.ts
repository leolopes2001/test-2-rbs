import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem(this.authService.tokenKey);

    if (token) {
      return this.authService.checkTokenValidity().pipe(
        map(isValid => {
          if (isValid) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
