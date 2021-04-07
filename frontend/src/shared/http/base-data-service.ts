import {HttpErrorResponse} from '@angular/common/http';
// import {ViewUtils} from '../components/views/view-utils';
import {Observable, throwError} from 'rxjs';
// import {ServiceLocator} from '../service-locator.service';
import {Router} from '@angular/router';
import {AppConstants} from '../app-constants';
import {ViewUtils} from '../components/views/view-utils';
import {throwError as observableThrowError} from 'rxjs/internal/observable/throwError';
import {ServiceLocator} from '../service-locator.service';

export class ServerAPIError {
    // code: number;
    message: any;
    // name: string;
    status: number;
    // type: string;
    errors?: [];

    public getJSONMessage() {
        try {
            return JSON.parse(this.message);
        } catch {
            return {'*': this.message};
        }
    }
}

export class ApplicationError {

    get code(): number {
        return this.serverError.status;
    }

    get message(): string {
        // return ViewUtils.decodeApplicationError(this.serverError); // TODO-AC: da gestire
        return this.serverError.message;
    }

    get errors(): [] {
      return this.serverError.errors;
    }

    private serverError: ServerAPIError;

    constructor(serverError: ServerAPIError) {
        this.serverError = serverError;
    }
}

export abstract class BaseDataService {
    constructor() {

    }

    protected handleHttpError(errorResponse: HttpErrorResponse): Observable<any> {
        const appError = new ServerAPIError();
        appError.status = AppConstants.HTTP_INTERNAL_SERVER_ERROR;
        appError.message = 'Errore di comunicazione con il server.';
        // let msg = ;
        // let code = 0;
        if (errorResponse.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', errorResponse.error.message);
        } else {
            if (errorResponse.status === AppConstants.HTTP_ERROR_UNAUTHORIZED) {
              const router = ServiceLocator.injector.get(Router);
              router.navigate(['/login']);
            }else if (errorResponse.error && errorResponse.error.status && errorResponse.status !== AppConstants.HTTP_INTERNAL_SERVER_ERROR) {
                appError.status = errorResponse.error.status;
                appError.message = errorResponse.error.message;
                appError.errors = (errorResponse.error.data) ? errorResponse.error.data : [];
                console.error(
                    `Backend returned code ${errorResponse.error.status}, ` +
                    `message was: ${errorResponse.error.message}`);
            }
        }
        return throwError(new ApplicationError(appError));
    }

}
