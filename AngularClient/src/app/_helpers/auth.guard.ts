import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  
  constructor(private authService:AuthenticationService, private router:Router){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    const rolesAssigned=this.authService.getUserRoles();
    if(rolesAssigned && rolesAssigned.length>0){
      // check if route is restricted by role
    const {roles} = route.data;
    if (roles && Array.isArray(roles)) {
      const hasRole = roles.some((role: string) => rolesAssigned.includes(role));
      if (hasRole) {
        // authorized so return true
        return true;
      } else {
        // role not authorized so redirect to home page
        this.router.navigate(['/']);
        return false;
      }
    } else {
      // if no roles are defined on the route, allow access
      return true;
    }
      
    }
     // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
