import { createAction, props } from "@ngrx/store";
import { MmsPageParam } from "src/app/mms-models/pageparam.model";
import { User } from "src/app/mms-models/user.model";
import { MmsUserActivationDTO } from "src/app/mms-models/useractivation.model";
import { MmsUserCreateDTO } from "src/app/mms-models/usercreate.model";
import { MmsUserUpdateDTO } from "src/app/mms-models/userupdate.model";

//Creat Users in the MmService and add to the NgRx State
//========================================================
export enum createUserActionTypes {
    AddNewUser = '[MmsUser] Add New user',
    AddNewUserSuccess = '[MmsUser] Add New user Success',
    AddNewUserFail = '[MmsUser] Add New user Fail',
}

export const addNewUser = createAction(createUserActionTypes.AddNewUser, props<{payload: MmsUserCreateDTO}>() );
export const addNewUserSuccess = createAction(createUserActionTypes.AddNewUserSuccess, props<{ payload: User }>());
export const addNewUserFail = createAction(createUserActionTypes.AddNewUserFail, props<{ error: any }>());

//Load Users from MmService to NgRx
//======================================
export enum loadUsersActionTypes {
    LoadMmsUsers = '[MmsUser] Load users',
    LoadMmsUsersSuccess = '[MmsUser] Load users Success',
    LoadMmsUsersFail = '[MmsUser] Load users Fail',
    LoadMmsUsersPaged = '[MmsUser] Load users Paged'
}
 
export const loadMmsUsers = createAction(loadUsersActionTypes.LoadMmsUsers );
export const loadMmsUsersSuccess = createAction(loadUsersActionTypes.LoadMmsUsersSuccess, props<{ payload: User[] }>());
export const loadMmsUsersFail = createAction(loadUsersActionTypes.LoadMmsUsersFail, props<{ error: any }>());
export const loadMmsUsersPaged = createAction( loadUsersActionTypes.LoadMmsUsersPaged
                                                                    ,props<{userFirstname: string;
                                                                          userLastname: string; 
                                                                          userEmail: string;
                                                                          pageParam: MmsPageParam}>());

//Update MMsUser in MmSerive and NgRx
//===================================
export enum updateUserActionTypes {
  UpdateMmsUser = '[MmsUser] Update user',
  UpdateMmsUserSuccess = '[MmsUser] Update user Success',
  UpdateMmsUserFail = '[MmsUser] Update user Fail',
}

export const updateMmsUser = createAction(updateUserActionTypes.UpdateMmsUser, props<{payload: MmsUserUpdateDTO}>() );
export const updateMmsUserSuccess = createAction(updateUserActionTypes.UpdateMmsUserSuccess, props<{ payload: User }>());
export const updateMmsUserFail = createAction(updateUserActionTypes.UpdateMmsUserFail, props<{ error: any }>());


//Update MMsUser in MmSerive and NgRx
//===================================
export enum updateUserActivationActionTypes {
  UpdateUserActivation = '[MmsUser] Update user activation',
  UpdateUserActivationSuccess = '[MmsUser] Update user activation Success',
  UpdateUserActivationFail = '[MmsUser] Update user activation Fail',
}

export const updateUserActivation = createAction(updateUserActivationActionTypes.UpdateUserActivation, props<{payload: MmsUserActivationDTO}>() );
export const updateUserActivationSuccess = createAction(updateUserActivationActionTypes.UpdateUserActivationSuccess, props<{ payload: String }>());
export const updateUserActivationFail = createAction(updateUserActivationActionTypes.UpdateUserActivationFail, props<{ error: any }>());