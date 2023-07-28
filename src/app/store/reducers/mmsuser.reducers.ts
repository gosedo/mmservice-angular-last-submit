import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/mms-models/user.model";
import * as MmsUserActions from '../actions/mmsuser.actions';

export interface State {
    loading: boolean;
    mmsUsers: User[];
    error: '';
  }
  
  const initialState: State = {
    loading: false,
    mmsUsers: [],
    error: '',
  };
    
  export const mmsUsersReducers = createReducer(
    initialState,
    on(MmsUserActions.addNewUser, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(MmsUserActions.addNewUserSuccess, (state, {payload: mmsUser}) =>({
      ...state,
      mmsUsers: [...state.mmsUsers, mmsUser],
      loading: false
    })
    ),
    on(MmsUserActions.addNewUserFail, (state, { error }) => ({
      ...state,
      error
    })),
    on(MmsUserActions.loadMmsUsers,(state)=>({
      ...state,
      mmsUsers: [],
      loading: true,
      error: null,
    })),
      
    on(MmsUserActions.loadMmsUsersSuccess,(state,{payload: listOfTechTasks})=>({
      ...state,
      loading: false,
      mmsUsers: [...listOfTechTasks]
      
    })),
    on(MmsUserActions.loadMmsUsersFail,(state,{error})=>({
      ...state,
      error
    })),
    on(MmsUserActions.updateMmsUser,(state)=>({
      ...state,
      loading: true,
      error: null,
    })),
    on(MmsUserActions.updateMmsUserSuccess,(state,{payload: updateMmsUser})=>({
      ...state,
      loading: false,
      mmsUsers: state.mmsUsers.map(mmsUserInStore => {
        
        if (mmsUserInStore.userId === updateMmsUser.userId ) {
          return updateMmsUser;
        }
        return mmsUserInStore;
      })
      
    })),
    on(MmsUserActions.updateMmsUserFail,(state,{error})=>({
      ...state,
      error
    })),
      
);