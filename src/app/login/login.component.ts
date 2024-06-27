import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router) {}

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  onLogin() {
    this.errorMessage = '';
    this.loading = true;
    this.http
      .post<any>(`${environment.apiUrl}/auth/login`, {
        email: this.email,
        password: this.password,
      })
      .pipe(
        catchError((error) => {
          console.error(error);
          this.errorMessage = 'Error while logging in';
          this.loading = false;
          return [];
        })
      )
      .subscribe((response) => {
        this.loading = false;
        localStorage.setItem('accessToken', response?.accessToken);
        this.router.navigate(['/search']);
      });
  }
}
