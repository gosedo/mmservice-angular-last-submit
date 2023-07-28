import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {AppState} from '../store/state/state-model';

import { nextTick } from 'process';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("The store just before we modify request header in interceptor");
    console.log(this.store);
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.authInfo;
      }),
      exhaustMap(authInfo => {
        if (!authInfo) {
          console.log(req);
          return next.handle(req);
        }
        const authReq = req.clone({
          headers: req.headers
          .set('Authorization', `Bearer ${authInfo.token}`)
          
        });
        // const modifiedReq = req.clone({
        //   setHeaders: {
        //     Authorization: `Bearer ${authInfo.token}`,
        //   },
        //   //params: new HttpParams().set('auth', authInfo.token)
        // });
        console.log("From Interceptor =====================*************");
        console.log(authReq);
        return next.handle(authReq);
      })
    );
  }
}