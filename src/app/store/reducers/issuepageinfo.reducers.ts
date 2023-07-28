import { createReducer, on } from "@ngrx/store";
import { StaticData } from "src/app/mms-models/staticdata.model";
import * as fromIssuePageInfoActions from '../actions/issuepageinfo.actions'
import { MmsPageParam } from "src/app/mms-models/pageparam.model";
import { IssuesPageInfo } from "src/app/mms-models/issuepageinfo.model";

export interface State {
     issuesPageInfo: IssuesPageInfo;
}

const initialState: State = {
    issuesPageInfo: null
};
  
export const issuePageInfoReducers = createReducer(
    initialState,
    on(fromIssuePageInfoActions.setPageInfoForIssues, (state, { payload: pageInfo }) => ({
      ...state,
      issuesPageInfo: pageInfo,
      
    }))
    
);