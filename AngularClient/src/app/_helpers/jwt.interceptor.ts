import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from '../../environments/environment';

/**
 * JwtInterceptor is an HTTP interceptor that adds a JWT token to outgoing HTTP requests
 * if the user is logged in and the request is to the API URL.
 */
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
   
   // Check if the user is logged in and the request is to the API URL
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    // Pass the cloned request instead of the original request to the next handler
    // This allows the request to be processed with the new headers
    return next.handle(req);
  }
}
