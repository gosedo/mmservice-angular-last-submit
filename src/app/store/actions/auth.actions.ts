import { createAction, props } from "@ngrx/store";


export const LoginStart   = createAction( '[Auth] Login Start',  props<{payload: {email: string; password: string}}>());

export const AuthenticateSuccess = createAction( '[Auth] Login', props<{authInfoPayload: {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
    expirationDate: Date;
    userRoleIds: number[];
    redirect: boolean;
  }}>());

export const AuthenticateFail    = createAction( '[Auth] Login Fail',  props<{payload: string}>());

export const SignupStart = createAction( '[Auth] Signup Start',  props<{payload: { email: string; password: string } }>());

export const ClearError = createAction( '[Auth] Clear Error');

export const AutoLogin = createAction(  '[Auth] Auto Login');

export const Logout = createAction(  '[Auth] Logout');


