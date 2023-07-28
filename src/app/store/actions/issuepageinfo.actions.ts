import { createAction, props } from "@ngrx/store";
import { IssuesPageInfo } from "src/app/mms-models/issuepageinfo.model";
import { MmsPageParam } from "src/app/mms-models/pageparam.model";

export enum PageInfoIssuesActionTypes {
     SetPageInfoForIssues = '[PageInfoIssues] Set Page Info For Issues'
}
  
export const setPageInfoForIssues = createAction(
    PageInfoIssuesActionTypes.SetPageInfoForIssues
    , props<{ payload: IssuesPageInfo }>()
);
  
  
