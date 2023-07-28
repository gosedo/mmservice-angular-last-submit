import { createReducer, on } from "@ngrx/store";
import { UsersPageInfo } from "src/app/mms-models/userspageinfo.model";
import * as fromUserPageInfoActions from '../actions/userspageinfo.actions'

export interface State {
    usersPageInfo: UsersPageInfo;
}

const initialState: State = {
   usersPageInfo: null
};
 
export const userPageInfoReducers = createReducer(
   initialState,
   on(fromUserPageInfoActions.setPageInfoForUsers, (state, { payload: pageInfo }) => ({
     ...state,
     usersPageInfo: pageInfo,
     
   }))
   
);