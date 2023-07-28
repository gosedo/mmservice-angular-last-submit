import { createAction, props } from "@ngrx/store";
import { UsersPageInfo } from "src/app/mms-models/userspageinfo.model";

export enum PageInfoUsersActionTypes {
    SetPageInfoForUsers = '[PageInfoUsers] Set Page Info For Users'
}
 
export const setPageInfoForUsers = createAction(
    PageInfoUsersActionTypes.SetPageInfoForUsers
   , props<{ payload: UsersPageInfo }>()
);
 