import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { UserInfo } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private userInfoSubject = new BehaviorSubject<UserInfo | null>(null);
  userInfo$ = this.userInfoSubject.asObservable();

  getUserInfo(): Observable<UserInfo> {
    const accessToken = localStorage.getItem('accessToken');
    return this.http
      .get<UserInfo>(`${environment.apiUrl}/auth/verify`, {
        headers: new HttpHeaders({
          authorization: `Bearer ${accessToken}`,
        }),
      })
      .pipe(
        tap((response: UserInfo) => {
          this.userInfoSubject.next(response);
        })
      );
  }
}
