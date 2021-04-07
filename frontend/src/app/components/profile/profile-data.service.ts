import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BaseDataService} from '../../../shared/http/base-data-service';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {WSResponse} from '../../../shared/http/wsresponse';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService extends BaseDataService{

  constructor(private router: Router, private http: HttpClient) {
    super();
  }

  public getProfile(){
    return this.http.post(environment.apiHost + '/me', undefined)
      .pipe(
        map(response => response),
        map((response: WSResponse) => {
          return response.data;
        }),
        catchError(this.handleHttpError)
      );
  }
}
