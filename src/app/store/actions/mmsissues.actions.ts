import { createAction, props } from "@ngrx/store";
import { MaintenanceIssue } from "src/app/mms-models/maintenanceissue.model";
import { MmsIssueCreateDTO } from "src/app/mms-models/issuecreate.model";
import { MmsIssueUpdateDTO } from "src/app/mms-models/issueupdate.model";
import { MmsPageParam } from "src/app/mms-models/pageparam.model";



export const SetIssues   = createAction( '[MaintenanceIssues] Set MaintenanceIssues',  props<{issues: MaintenanceIssue[]}>());

export const FetchIssues = createAction( '[MaintenanceIssues] Fetch MaintenanceIssues');

export const FetchIssuesByUserId = createAction( '[MaintenanceIssues] Fetch MaintenanceIssues By User ID',props<{mmsuserId: number}>());

export const FetchIssuesByUserIdPaged = createAction( '[MaintenanceIssues] Fetch MaintenanceIssues By User ID Paged'
          ,props<{mmsuserId: number;
            issueId: number; 
            startDate: string;
            endDate: string;
            pageParam: MmsPageParam}>());

export const AddIssue    = createAction( '[MaintenanceIssues] Add MaintenanceIssue',  props<{mmsIssue: MaintenanceIssue}>());

export const UpdateIssue = createAction( '[MaintenanceIssues] Update MaintenanceIssue',  props<{updatedIssuePayLoad:{ index: number; newMaintenanceIssue: MaintenanceIssue }}>());

export const DeleteIssue = createAction( '[MaintenanceIssues] Delete MaintenanceIssue',  props<{ deleteAtIndex: number }>());

export const StoreIssues = createAction(  '[MaintenanceIssues] Store MaintenanceIssues');



export enum issueCreateActionTypes {
    AddNewIssue = '[MaintenanceIssuesC] Add New Issue',
    AddNewIssueSuccess = '[MaintenanceIssues] Add New Issue Success',
    AddNewIssueFail = '[MaintenanceIssues] Add New Issue Fail',
}
//Static Data needed to create Issues

export const addNewIssue = createAction(
    issueCreateActionTypes.AddNewIssue
    , props<{payload: MmsIssueCreateDTO}>() );
  
export const addNewIssueSuccess = createAction(
    issueCreateActionTypes.AddNewIssueSuccess
    , props<{ payload: MaintenanceIssue }>()
  );
  
  export const addNewIssueFail = createAction(
    issueCreateActionTypes.AddNewIssueFail
    , props<{ error: any }>()
  );


export enum issueUpdateActionTypes {
    UpdateUnitsIssue = '[MaintenanceIssues] Update Units Issue',
    UpdateUnitsIssueSuccess = '[MaintenanceIssues] Update Units Issue Success',
    UpdateUnitsIssueFail = '[MaintenanceIssues] Update Units Issue Fail',
}
//Static Data needed to create Issues

export const updateUnitsIssue = createAction(
  issueUpdateActionTypes.UpdateUnitsIssue
    , props<{payload: MmsIssueUpdateDTO}>() );
  
export const updateUnitsIssueSuccess = createAction(
  issueUpdateActionTypes.UpdateUnitsIssueSuccess
    , props<{ payload: MaintenanceIssue }>()
  );
  
export const updateUnitsIssueFail = createAction(
  issueUpdateActionTypes.UpdateUnitsIssueFail
    , props<{ error: any }>()
  );



