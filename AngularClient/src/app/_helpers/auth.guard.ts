import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  
  constructor(private authService:AuthenticationService, private router:Router){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    const user=this.authService.userValue;
    if(user){
      // check if route is restricted by role
      const {roles}=route.data;
      if(roles && !roles.includes(user.role)){
        // role not authorized so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
      // authorized so return true  
      return true;
    }
     // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
