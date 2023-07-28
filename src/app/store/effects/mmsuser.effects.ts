import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import * as MmsUserActions from '../actions/mmsuser.actions';
import * as UsersPageInfoActions from '../actions/userspageinfo.actions';
import { User } from "src/app/mms-models/user.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Store } from "@ngrx/store";
import * as fromState from '../state/state-model'
import { of } from "rxjs";
import { MmsUsersResponse } from "src/app/mms-models/userspagedresponse.model";
import { UsersPageInfo } from "src/app/mms-models/userspageinfo.model";


@Injectable()
export class MmsUserEffects {


  mmsUserActivation = createEffect(() => this.actions$.pipe(
    ofType(MmsUserActions.updateUserActivation),
    map(action => action.payload),
    mergeMap(updateUserPassword =>{

        let activationDataBody = {
                              activationId: updateUserPassword.activationId,
                              newPassword: updateUserPassword.newPassword
                                
                            }
                
        return this.http.post<string>(
                                'http://localhost:8080/api/mmsuser/mmsuser-activation', activationDataBody
                                                
                                ).pipe(
                                map(activationMessage => {
                                    return MmsUserActions.updateUserActivationSuccess( {payload: activationMessage})
                                })
                                ,
                                catchError((errValue) =>
                                    of( MmsUserActions.updateUserActivationFail(errValue))
                                )
                                )
                
    }
    )
));

updateMmsUser = createEffect(() => this.actions$.pipe(
    ofType(MmsUserActions.updateMmsUser),
    map(action => action.payload),
    mergeMap(updateUserFormData =>{

        let updatedUserBody = {
                                userId: updateUserFormData.userId,
                                userEmail: updateUserFormData.userEmail,
                                userPassword: updateUserFormData.userPassword,
                                userFirstname: updateUserFormData.userFirstname,
                                userLastname: updateUserFormData.userLastname,
                                userPhone: updateUserFormData.userPhone,
                                userRoles: updateUserFormData.userRoles,
                                userStatus: updateUserFormData.userStatus
                            }
                
        return this.http.post<User>(
                                'http://localhost:8080/api/mmsuser/mmsuser-update', updatedUserBody
                                                
                                ).pipe(
                                map(mmsuser => {
                                    return MmsUserActions.updateMmsUserSuccess( {payload: mmsuser})
                                })
                                ,
                                catchError((errValue) =>
                                    of( MmsUserActions.updateMmsUserFail(errValue))
                                )
                                )
                
    }
    )
));
     

loadUser = createEffect(()=> this.actions$.pipe(
        ofType(MmsUserActions.loadMmsUsers),
        switchMap(() => {

            return this.http.get<User[]>(
                                    'http://localhost:8080/api/mmsuser/mmsuser-list'
            ).pipe(
                    map(listOfUsers => {
                    return MmsUserActions.loadMmsUsersSuccess({ payload: listOfUsers});
                    }
                    ),
                    catchError(error => {
                        return of(MmsUserActions.loadMmsUsersFail(error))
                    })
                )
        }
      )
));



loadUsersPaged = createEffect(()=> this.actions$.pipe(
  ofType(MmsUserActions.loadMmsUsersPaged),
  switchMap((action) => {
    
    let params = new HttpParams();

    if (action.pageParam.pageNo != null && action.pageParam.pageSize != null) {

      if(!!action.userFirstname){
         params = params.append("userFirstname", action.userFirstname);
      }
      if(!!action.userLastname){
         params = params.append("userLastname", action.userLastname);
      } 

      if(!!action.userEmail){
        params = params.append("userEmail", action.userEmail);
      }
      
      params = params.append("pageNo", action.pageParam.pageNo.toString());
      params = params.append("pageSize", action.pageParam.pageSize.toString());
      params = params.append("sortBy", action.pageParam.sortBy.toString());
      params = params.append("sortDir", action.pageParam.sortDir.toString());
    }

    return this.http.get<MmsUsersResponse>(
      'http://localhost:8080/api/mmsuser/mmsuser-list-paged', {params: params}
    ).pipe(
      switchMap(pagedResponse => {
        console.log(pagedResponse.content);
        let users = pagedResponse.content;
        let pageInfo:UsersPageInfo = new UsersPageInfo(pagedResponse.pageNo
                                                        ,pagedResponse.pageSize
                                                        ,pagedResponse.totalElements
                                                        ,pagedResponse.totalPages
                                                        ,pagedResponse.last)
        

        return of(MmsUserActions.loadMmsUsersSuccess({payload: users}),
        UsersPageInfoActions.setPageInfoForUsers({payload: pageInfo}));
        })
    )
  }),

  
)
);


addNewUser = createEffect(() => this.actions$.pipe(
    ofType(MmsUserActions.addNewUser),
    map(action => action.payload),
    mergeMap(createUserFormData => {

    
        let newUserBody = {
            userEmail: createUserFormData.userEmail,
            userPassword: createUserFormData.userPassword,
            userFirstname: createUserFormData.userFirstname,
            userLastname: createUserFormData.userLastname,
            userPhone: createUserFormData.userPhone,
            userRoles: createUserFormData.userRoles,
            userTeam:createUserFormData.userTeam,
            userUnit:createUserFormData.userUnit

        }
  
        return this.http.post<User>(
                'http://localhost:8080/api/mmsuser/mmsuser-create', newUserBody
                                  
                ).pipe(
                  map(mmsuser => {
                    return MmsUserActions.addNewUserSuccess( {payload: mmsuser})
                  }),
                  catchError((errValue) =>
                    of( MmsUserActions.addNewUserFail(errValue))
                  )
                )
      }
   )

  ));




  
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromState.AppState>
  ) {}

}