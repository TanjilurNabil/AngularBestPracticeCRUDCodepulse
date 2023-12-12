import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: LoginRequest;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.model = {
      email: '',
      password: '',
    };
  }

  onFormSubmit(): void {
    this.authService.login(this.model).subscribe({
      next: (response) => {
        //Set Auth Cookie
        this.cookieService.set(
          'Authorizer',
          `Bearer ${response.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );
        //Set User information to localStorage and emit the value so that navbar component can subscribe to it change accordingly
        this.authService.setUser({
          email: response.email,
          roles: response.roles,
        });

        //Redirect back to home
        this.router.navigateByUrl('/');
      },
    });
  }
}
