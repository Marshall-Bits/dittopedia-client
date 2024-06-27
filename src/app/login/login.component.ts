import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private http: HttpClient) {}

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  onLogin() {
    this.errorMessage = '';
    this.loading = true;
    this.http.post<any>('http://localhost:5005/auth/login', { email: this.email, password: this.password })
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
    });
  }
}
