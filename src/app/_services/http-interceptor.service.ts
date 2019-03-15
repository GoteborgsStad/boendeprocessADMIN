import {
  HttpErrorResponse, HttpEvent, HttpHandler,
  HttpInterceptor, HttpRequest, HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Cookie } from 'ng2-cookies';

import { Observable } from 'rxjs/Rx';

import { environment } from './../../environments/environment';

import { Jwt } from '../_models/jwt.model';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  public tokenIsRefreshing: boolean = false;
  public readonly requestRetryLimit = 4;
  public readonly timeLeftForTokenRefresh = 20; // Amount of time left of token to try refresh
  public readonly errorsToRetry: string[] = ['token_invalid']; // Error responses that should be retried
  public readonly errorsToDeauthenticate: string[] = [
    'token_expired',
    'token_not_provided',
    'user_not_customer_admin',
  ];
  // Error responses that should deauthenticate the user

  constructor(
    private _router: Router,
  ) { }

  /**
   * This function intercepts outgoing requests and incoming responses.
   * It is used to set authentication token, handle error responses.
   *
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof HttpInterceptorService
   */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=UTF-8') });
    }
    if (request.url.includes('assets')) {
      return next.handle(request)
        .timeout(10000)
        .catch((error) => {
          this.clearCookiesAndLogout();
          return Observable.throw(error);
        });
    }

    // setting the accept header

    request = request.clone({ headers: request.headers.set('Accept', 'application/json, text/plain, */*') });
    // Prepend the api url to the requestuests and set the Authorization header for every outgoing requestuest
    if (request.url.includes('assets')) {
     return next.handle(request)
       .timeout(10000)
       .catch((error) => {
         this.clearCookiesAndLogout();
         return Observable.throw(error);
       });
   } else if (Cookie.get('id_token') !== null
      && typeof Cookie.get('id_token') !== 'undefined'
      && Cookie.get('id_token').length > 0) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${Cookie.get('id_token')}`,
        },
        url: `${environment.API_URL}${request.url}`,
      });
    } else {
      request = request.clone({
        url: `${environment.API_URL}${request.url}`,
      });
    }

    if (Cookie.get('id_token')) {
      const token = new Jwt(Cookie.get('id_token'));
      const tokenExpirationDate: any = token.getTokenExpirationDate();
      const diff = Math.abs((new Date()).valueOf() - (new Date(tokenExpirationDate)).valueOf());
      const minutesLeftUntilTokenExpires = Math.floor((diff / 1000) / 60);

      if (minutesLeftUntilTokenExpires < this.timeLeftForTokenRefresh && !this.tokenIsRefreshing) {
        this.tokenIsRefreshing = true;
        this.refreshToken();
      }
    }

    return Observable.defer(() => next.handle(request)).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // Things to do with responses goes here
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.catchError(err);
        if (environment.LOG_ERRORS) {
          console.log(err.error);
        }
      }
    }).retryWhen((errors) => {
      // Reassign Authorization header to make sure request wasn't made with old access token
      if (Cookie.get('id_token') !== null
        && typeof Cookie.get('id_token') !== 'undefined'
        && Cookie.get('id_token').length > 0) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${Cookie.get('id_token')}`,
          },
          url: `${environment.API_URL}${request.url}`,
        });
      } else {
        request = request.clone({
          url: `${environment.API_URL}${request.url}`,
        });
      }

      // Retry 4 times with a 1 second delay to make sure request was not concurrent with JWT refresh
      return this.handleRetry(errors)
        .delay(1000)                                              // Delay between each request
        .scan((errorCount, err) => {                              // Accumulate request retries
          return errorCount + 1;
        }, 0)
        .takeWhile((errorCount) => this.retryRequest(errorCount))
        // Retry limit and handling when the amount of allowed retries are exceeded
        .concat(Observable.throw(errors)); // Concatenate and throw errors when retry amout is exceeded
    });
  }

  /**
   * Handles all error responses and decides if the request should be retried or thrown.
   *
   * @private
   * @param {Observable<HttpErrorResponse>} errors
   * @returns {Observable<any>}
   * @memberof HttpInterceptorService
   */
  private handleRetry(errors: Observable<HttpErrorResponse>): Observable<any> {
    return errors.mergeMap((error) => {
      const responseMessage: any = error.error.error; // error

      if (this.errorsToRetry.includes(responseMessage)) {
        // Return observable to be retried
        return Observable.of(error);
      } else if (this.errorsToDeauthenticate.includes(responseMessage)) {
        // Throw the error and logout the user
        this.clearCookiesAndLogout();
        return Observable.throw(error);
      } else {
        // Throw the error to give up retrying
        return Observable.throw(error);
      }
    });
  }

  /**
   * Returns boolean to decide if request should be retried depending on current failed requests
   *
   * @private
   * @param {number} errorCount
   * @returns {boolean}
   * @memberof HttpInterceptorService
   */
  private retryRequest(errorCount: number): boolean {
    if (errorCount >= this.requestRetryLimit) {
      this.clearCookiesAndLogout();
    }

    return errorCount < this.requestRetryLimit;
  }

  private clearCookiesAndLogout() {
    Cookie.delete('id_token');
    Cookie.delete('userrole');

    this._router.navigate(['/']);
  }

  private refreshToken() {
    /* this.injector.get(AuthService).refreshAccessToken().subscribe(
      (res) => {
        Cookie.set('id_token', res.replace(/"/g, '')); // Save new token as cookie
        this.tokenIsRefreshing = false;
        this._authEventService.login(); // Resets the idle timer
      },
    );*/
  }

  private catchError(response: HttpErrorResponse) {
    return (res: HttpErrorResponse) => {

      if (environment.LOG_ERRORS) {
        console.log(res);
      }

      if (res.status === 401 || res.status === 403 || res.status === 400) {
        switch (res.error) {
          case 'token_invalid':
            this.clearCookiesAndLogout();
            break;
          case 'token_expired':
            this.clearCookiesAndLogout();
            break;
          case 'token_not_provided':
            this.clearCookiesAndLogout();
            break;
          case 'user_not_admin':
            this.clearCookiesAndLogout();
            break;
          default:
            return Observable.throw(res);
        }
      } else if (res.status === 429) { // Too many requests
        // console.log("Too many requests.");
      }

      return Observable.throw(res);
    };
  }

}
