import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from '../../environments/environment';

export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const user = this.authService.userValue;
    const isLoggedIn = user && user?.token;
     const isApiUrl = req.url.startsWith(environment.apiUrl);
   // Check if the user is logged in and the request is to the API URL
    if (isLoggedIn && isApiUrl) {
      // Clone the request and set the Authorization header in one step
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }
    // Pass the cloned request instead of the original request to the next handler
    // This allows the request to be processed with the new headers
    return next.handle(req);
  }
}
