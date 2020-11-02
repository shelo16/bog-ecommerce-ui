import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from './token-storage.service';
import {CookieService} from 'ngx-cookie-service';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private token: TokenStorageService, private cookieService: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    console.log('Request :::: ',authReq.body);
    const token = this.token.getToken();
    console.log('TOKEN : ',token);

    console.log('Cookies ::: ',this.cookieService.getAll());

    if (token != null && token != 'undefined') {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer-' + token)});
    }
    return next.handle(authReq);
  }

}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true }
];
