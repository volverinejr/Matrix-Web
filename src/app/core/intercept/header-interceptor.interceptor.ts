import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from '../server/local-storage.service';

@Injectable()
export class HeaderInterceptorInterceptor implements HttpInterceptor {

  constructor(
    protected localStorageService: LocalStorageService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes("api/security/oauth/token")) {
      return next.handle(req);
    }

    const idToken = this.localStorageService.getToken();

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + idToken)
      });

      return next.handle(cloned).pipe(
        catchError(response => {

          if (response.status == 500) {
            if (response.error && response.error.includes("Expired or invalid JWT token")) {
              return throwError("Token inválido ou expirado!");
            }
          }

          return throwError(response);
        })
      );
    }
    else {
      console.log("04");
      return next.handle(req);
    }
  }

}
