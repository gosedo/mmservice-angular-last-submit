import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { catchError, map, tap } from "rxjs/operators";
import { Subject, throwError} from 'rxjs';
import { AuthUser } from "./authuser.model";

export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable({providedIn:'root'})
export class AuthService_Not_in_Use{
    user = new Subject<AuthUser>();
    
    constructor(private http: HttpClient){   }
    
    signup(email:string, password: string){
      return  this.http
        .post<AuthResponseData>(
          
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+
          environment.firebaseAPIKey,
          {
            email: email,
            password: password,
            returnSecureToken: true
          }
        ).pipe(
                  catchError(this.handleError)
                , tap(resData => {
                    this.handleAuthentication(resData.email
                                ,resData.localId
                                ,resData.idToken
                                ,+resData.expiresIn)
                    }
                    )
                )
        
    }
    signin(email:string,password:string){
        return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            environment.firebaseAPIKey,
          {
            email: email,
            password: password,
            returnSecureToken: true
          }
        ).pipe(
                  catchError(this.handleError)
                , tap(resData => {
                    this.handleAuthentication(resData.email
                                ,resData.localId
                                ,resData.idToken
                                ,+resData.expiresIn)
                    }
                    )
                )
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime()+ +expiresIn*1000);
                    const user = new AuthUser(email
                                    , userId
                                    , token
                                    , expirationDate)
                                    this.user.next(user);
    }
    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error occured!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email doesn\'t exist. Please sign up.' 
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.'
            }
            return throwError(errorMessage);
    }


}