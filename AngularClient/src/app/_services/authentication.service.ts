import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
userSubject: BehaviorSubject<User|null>;
user:Observable<User|null>;
  constructor(private router:Router, private httpClient:HttpClient) {
    this.userSubject = new BehaviorSubject<User|null>(JSON.parse(localStorage.getItem('user')!));
    this.user=this.userSubject.asObservable();
   }
  public get userValue(): User|null {
    return this.userSubject.value;
  }

  register(registerModel:any): Observable<User> {
  // implement registration logic
  return this.httpClient.post<User>(`${environment.authUrl}/register`, registerModel)
}

  login(loginModel:any): Observable<User> {
    return this.httpClient.post<User>(`${environment.authUrl}/login`, loginModel)
      .pipe(
        map(user=>{
              // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }) //map ends here
    ); //pipe ends here
  }
  
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

}
