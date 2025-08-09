import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({providedIn:'root'})
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private router:Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error here
        if (error.status === 401) {
          // Redirect to login or show an error message
          console.error('Unauthorized request - redirecting to login');
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          // Handle forbidden access
          console.error('Forbidden request - redirecting to home');
          this.router.navigate(['/']);
        } else {
          // Handle other errors
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
