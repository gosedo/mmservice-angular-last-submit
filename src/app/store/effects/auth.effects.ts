import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";

import * as fromState from '../state/state-model'
import * as AuthActions from '../actions/auth.actions';
import { AuthInformation } from "src/app/auth/authinfo.model";
import { Observable, of } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";


export interface AuthResponseData{

    userId: number,
	  userEmail: string,
	  userFirstName: string,
	  userLastName: string,
	  jwtToken: string,
    tokenExpiration:Date,
    userRoleIds: number[]
}

const handleAuthentication = (

    userId: number,
	userEmail: string,
	userFirstName: string,
	userLastName: string,
	jwtToken: string,
    tokenExpiration:Date,
    userRoleIds: number[]
  ) => {
    //const expiresIn = 30;
    //const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new AuthInformation(userId, userEmail, userFirstName,userLastName, jwtToken, tokenExpiration,userRoleIds);
    localStorage.setItem('userData', JSON.stringify(user));
    console.log('Checking handleAuthentication =====');
    return  AuthActions.AuthenticateSuccess(
    {authInfoPayload:    
        {
            userId: userId,
            email: userEmail,
            firstName: userFirstName,
            lastName: userLastName,
            token: jwtToken,
            expirationDate: tokenExpiration,
            userRoleIds: userRoleIds,
            redirect: true
        }
    }
    );
  };
const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return of(AuthActions.AuthenticateFail({payload:errorMessage}));
    }
    switch (errorRes.error.error.message) {
      case 'Error1':
        errorMessage = 'This email exists already';
        break;
      case 'Error2':
        errorMessage = 'This email does not exist.';
        break;
      case 'Error3':
        errorMessage = 'This password is not correct.';
        break;
    }
    return of(AuthActions.AuthenticateFail({payload:errorMessage}));
  };


@Injectable()
export class AuthEffects {
  
  authLogin = createEffect(()=> this.actions$.pipe(
    ofType(AuthActions.LoginStart),
    tap((action) => {console.log("AuthActions.LoginStart")}),
    switchMap((action) => {

        const base64Credential = btoa(`${action.payload.email}:${action.payload.password}`)
        // const options = {
        //     headers: new HttpHeaders().set('Authorization',  `Basic ${base64Credential}`)
        // }
        var headers_object = new HttpHeaders();
        headers_object = headers_object.append('Content-Type', 'application/json');
        headers_object = headers_object.append("Authorization", "Basic " + base64Credential);

        const httpOptions = {
          headers: headers_object
        };

        return this.http
            .get<AuthResponseData>('http://localhost:8080/api/auth/signin',httpOptions
                                
         ).pipe(
            tap(resData => {
                //expiresIn = +resData.tokenExpirationDate
                const expiresIn = 3000;
                this.authService.setLogoutTimer( expiresIn * 1000);
                console.log("Testing");
            }),
            map(resData => {
                return handleAuthentication(
                   +resData.userId,
                    resData.userEmail,
                    resData.userFirstName,
                    resData.userLastName,
                    resData.jwtToken,
                    resData.tokenExpiration,
                    resData.userRoleIds
                  );
            })
            ,
            catchError(errorRes =>{
                console.log(errorRes);
                 return handleError(errorRes);
            })
         )
   })
  )
  );

  authRedirect = createEffect(()=> this.actions$.pipe(
    ofType(AuthActions.AuthenticateSuccess),
    tap((action) =>{

        if (action.authInfoPayload.redirect) {
            //if(action.authInfoPayload.userRoleIds.includes(1)){
               this.router.navigate(['/issue']);
            // }else{
            //   this.router.navigate(['/']);
            // }
        }
    })
  )
  , { dispatch: false });

  autoLogin = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AutoLogin),
    map(() =>{
        
        const userData:     { userId: number,
                             userEmail: string,
                             userFirstName: string,
                             userLastName: string,
                             _jwtToken: string,
                             _tokenExpirationDate:Date,
                             userRoleIds: number[]
                            }  = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return { type: 'DUMMY'}
        }
        const loadedUser = new AuthInformation(
            userData.userId,
            userData.userEmail,
            userData.userFirstName,
            userData.userLastName,
            userData._jwtToken,
            userData._tokenExpirationDate,
            userData.userRoleIds
        )

        if(loadedUser.token){
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.authService.setLogoutTimer(expirationDuration);

            return AuthActions.AuthenticateSuccess({
                authInfoPayload : {
                    userId: loadedUser.userId,
                    email: loadedUser.userEmail,
                    firstName: loadedUser.userFirstName,
                    lastName: loadedUser.userLastName,
                    token: loadedUser.token,
                    expirationDate: new Date( userData._tokenExpirationDate),
                    userRoleIds: loadedUser.userRoleIds,
                    redirect: true
                }
            })
        }
        return { type: 'DUMMY' };
    })
  )
  )

  authLogout = createEffect(()=> this.actions$.pipe(
    ofType(AuthActions.Logout),
    tap(() => {
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    })
    )
  ,{ dispatch: false });
  
  authSignup = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.SignupStart),

    switchMap((action) => {
      
      return this.http
        .post<AuthResponseData>(
          
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
          
          {
            email: action.payload.email,
            password: action.payload.password,
            returnSecureToken: true
          }
        )
        .pipe(
          //You can uncomment
         /*  tap(resData => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }), */
          map(resData => {
            return handleAuthentication(
               +resData.userId,
                resData.userEmail,
                resData.userFirstName,
                resData.userLastName,
                resData.jwtToken,
                resData.tokenExpiration,
                resData.userRoleIds

              );
        }),
          catchError(errorRes => {
            return handleError(errorRes);
          })
        );
    })
  )
  )
  
  


constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}