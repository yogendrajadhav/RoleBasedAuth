import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

export class AuthGuard implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    
    return true;
  }
}
