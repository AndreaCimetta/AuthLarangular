import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

import {catchError, map} from 'rxjs/operators';
import {LoginUserData} from './staff.model';
import {throwError as observableThrowError} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {WSResponse} from '../../shared/http/wsresponse';
import {BaseDataService} from '../../shared/http/base-data-service';

@Injectable({
  providedIn: 'root'
})
export class StaffService  extends BaseDataService{

  private loggedIn = false;
  public redirectURL = '';


  constructor(private router: Router,
              private jwtHelper: JwtHelperService,
              private http: HttpClient) {
    super();
  }


  /**
   * WS
   * **/
  public login(email, password) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=UTF-8');

    return this.http.post(environment.apiHost + '/login',
        JSON.stringify({'email': email, 'password': password}),
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8')
        }
      ).pipe(
          map(response => response),
          map((response: WSResponse) => {
            this.setToken(response);
            return response;
          }),
          catchError(this.handleHttpError)
      );
  }

  public signup(data){
    return this.http.post(environment.apiHost + '/signup', data)
      .pipe(
          map(response => response),
          map((response: WSResponse) => {
            this.setToken(response);
            return response.data;
          }),
          catchError(this.handleHttpError)
      );
  }

  public sendPasswordResetLink(data){
    return this.http.post(environment.apiHost + '/sendPasswordResetLink', data)
      .pipe(
        map(response => response),
        map((response: WSResponse) => {
          return response.data;
        }),
        catchError(this.handleHttpError)
      );
  }

  public changePassword(data){
    return this.http.post(environment.apiHost + '/resetPassword', data)
      .pipe(
        map(response => response),
        map((response: WSResponse) => {
          return response.data;
        }),
        catchError(this.handleHttpError)
      );
  }

  /**
   * Fine ws
   * ***/



  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user-data');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }

  public getUserData(): LoginUserData {
    const user = new LoginUserData();
    let data = localStorage.getItem('user-data');
    if (data) {
      if (environment.production) {
        data = atob(data);
      }

      Object.assign(user, JSON.parse(data));
    }
    return user;
  }

  public setToken(response: WSResponse): void{
    if (response.success) {
      localStorage.setItem('token', response.data.token ? response.data.token : response.data.access_token);
      if (response.data.userData) {
        let data = JSON.stringify(response.data.userData);
        if (environment.production) {
          data = btoa(data);
        }
        localStorage.setItem('user-data', data);
      }
      this.loggedIn = true;
    } else {
      localStorage.removeItem('token');
      this.loggedIn = false;
    }
  }

  public getToken(): any {
    return localStorage.getItem('token');
  }

  private checkToken(): any {
    return !!localStorage.getItem('token');
  }

  public invalidateSession(error: any): void {
    this.logout();
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return !this.jwtHelper.isTokenExpired();
  }

  public getJWTValue(): any {
    const token = this.getToken();
    return this.jwtHelper.decodeToken(token);
  }
}
