import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenKey = 'authToken';
  public apiUrl = 'http://localhost/api';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string, passwordConfirmation: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      name,
      email,
      password,
      c_password: passwordConfirmation
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.data.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout(): void {
    console.log("logout")
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  checkTokenValidity(): Observable<boolean> {
    const token = this.getToken();

    if (!token) {
      this.isAuthenticatedSubject.next(false);
      return of(false);
    }

    return this.http.get(`${this.apiUrl}/token/validate`, {
      headers: this.getHeaders()
    }).pipe(
      map(() => {
        this.isAuthenticatedSubject.next(true);
        return true;
      }),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {

    return this.isAuthenticated$.pipe(
      map(isAuthenticated => {
        return isAuthenticated;
      })
    );
  }

}
