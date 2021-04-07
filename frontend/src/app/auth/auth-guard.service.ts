import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {StaffService} from './staff.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild  {

  constructor(private staffService: StaffService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (this.staffService.isLoggedIn()) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.staffService.redirectURL = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login'], {queryParams: {r: url}});
    return false;
  }

  checkUserPermission(permission: string | string[]): boolean {
    if (permission) {
      if (!(permission instanceof Array)) {
        permission = [permission];
      }

      for (let perm of permission) {
        if (this.staffService.getUserData().getPermissionsMap()[perm] !== undefined)
          return true;
      }
      return false;
    } else {
      return false;
    }
  }
}
