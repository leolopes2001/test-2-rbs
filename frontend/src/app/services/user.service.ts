import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.authService.apiUrl}/users`, {
      headers: this.authService.getHeaders()
    });
  }
}
