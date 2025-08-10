import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userSubject: BehaviorSubject<User | null>;
  
  user: Observable<User | null>;
  constructor(private router: Router, private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User | null {
    return this.userSubject.value;
  }

  register(registerModel: any): Observable<User> {
    // implement registration logic
    return this.httpClient.post<User>(`${environment.authUrl}/register`, registerModel)
  }

  login(loginModel: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.authUrl}/login`, loginModel)
      .pipe(
        map((response: any) => {
          // Explicitly create a User object
          // const user: User = {
          //   userName: response.data.userName,
          //   role: response.data.role,
          //   // add other User properties as needed
          //   email: response.data.email,
          //   profilePicture:response.data.profilePicture
          // };

         // localStorage.setItem('user', JSON.stringify(user));

         // this.userSubject.next();

        //  return user;

        this.setToken(response.data);
          return null;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const decoded: any = jwtDecode(token);
    return Array.isArray(decoded.role) ? decoded.role : [decoded.role]; // Handle both string and array
  }
  setToken(data: string) {
    localStorage.setItem('token', data);

    const expiresIn = 180; // seconds (3 minutes)
    const expiryTime = new Date().getTime() + expiresIn * 1000;

    localStorage.setItem('access_token', data);
    localStorage.setItem('token_expiry', expiryTime.toString());
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
 isTokenExpired(): boolean {
  const expiry = localStorage.getItem('token_expiry');
  if (!expiry) return true;

  const now = new Date().getTime();
  return now > +expiry;
}

removeExpiredToken(): void {
  if (this.isTokenExpired()) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
  }
}

}

