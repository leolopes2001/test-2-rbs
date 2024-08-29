import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';    

export const appConfig = {
  providers: [
    provideRouter([
      { path: 'cadastro', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'usuarios', component: UserListComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]),
    provideHttpClient(),
    provideAnimations(),
    AuthService,
    AuthGuard
  ],
  imports: [
    CommonModule],
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserListComponent
  ]
};
