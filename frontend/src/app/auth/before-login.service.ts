import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StaffService} from './staff.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate {

  constructor(private staffService: StaffService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }


  checkLogin(url: string): boolean {
    if (!this.staffService.isLoggedIn()) { // se non è loggato allora può  (return true)
      return true;
    }

    // Store the attempted URL for redirecting
    this.staffService.redirectURL = url;

    // Navigate to the login page with extras
    this.router.navigate(['/dashboard'], {queryParams: {r: url}});
    return false;
  }
}
