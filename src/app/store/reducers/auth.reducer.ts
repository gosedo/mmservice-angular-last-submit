import { AuthInformation } from "src/app/auth/authinfo.model";
import * as AuthActions from '../actions/auth.actions';
import { createReducer, on } from "@ngrx/store";


export interface State {
    authInfo: AuthInformation;
    authError: string;
    loading: boolean;
  }
  
  const initialState: State = {
    authInfo: null,
    authError: null,
    loading: false
  };
  
  export const authReducer = createReducer(
    initialState,
    //Gosaye: this can be used on(AuthActions.AuthenticateSuccess, (state, {action}) to directly use
    //authInfoPayload.userId rather than action.authInfoPayload.userId
    on(AuthActions.AuthenticateSuccess, (state, action) =>{
        const authInfoData = new AuthInformation(
            +action.authInfoPayload.userId,
            action.authInfoPayload.email,
            action.authInfoPayload.firstName,
            action.authInfoPayload.lastName,
            action.authInfoPayload.token,
            action.authInfoPayload.expirationDate,
            action.authInfoPayload.userRoleIds

        );
        return {...state
                ,authError: null
                ,authInfo: authInfoData
                ,loading: false
                };
    }),
    on(AuthActions.Logout, (state, action) =>{
      return {...state, authInfo: null};
    }),
    on(AuthActions.LoginStart, AuthActions.SignupStart,(state, action) =>{
      console.log("LoginStart from reducer");
      return { ...state, authError: null, loading: true};
    }),
    on(AuthActions.AuthenticateFail,(state,action) =>{
      return {...state,
              user: null,
              authError: action.payload,
              loading: false};
    }),
    on(AuthActions.ClearError,(state,action) => {
      return {
        ...state,
        authError: null
      };
    })
  );
    

//   export function authReducerx(
//     state = initialState,
//     action: AuthActions.AuthActions
//   ) {
//     switch (action.type) {
//       case AuthActions.AUTHENTICATE_SUCCESS:
//         const user = new User(
//           action.payload.email,
//           action.payload.userId,
//           action.payload.token,
//           action.payload.expirationDate
//         );
//         console.log(user.email +'=+=+==+==+');//Gosaye can be removed
//         return {
//           ...state,
//           authError: null,
//           user: user,
//           loading: false
//         };
//       case AuthActions.LOGOUT:
        
//         return {
//           ...state,
//           user: null
//         };
//       case AuthActions.LOGIN_START:
//       case AuthActions.SIGNUP_START:
//         return {
//           ...state,
//           authError: null,
//           loading: true
//         };
//       case AuthActions.AUTHENTICATE_FAIL:
        
//         return {
//           ...state,
//           user: null,
//           authError: action.payload,
//           loading: false
//         };
//       case AuthActions.CLEAR_ERROR:
//         return {
//           ...state,
//           authError: null
//         };
//       default:
//         return state;
//     }
//   }
  