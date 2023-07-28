import { createReducer, on } from "@ngrx/store";
import { MaintenanceIssue } from "src/app/mms-models/maintenanceissue.model";

import * as MmsIssuesActions from '../actions/mmsissues.actions'



export interface State {
  issues: MaintenanceIssue[];
}

const initialState: State = {
    issues: []
};
  

export const issueReducers = createReducer(
    initialState,
    on(MmsIssuesActions.SetIssues, (state, {issues}) =>({
      //...state, this was the first code changed to the below to reset the state to new one
      ...initialState,
      issues: [...issues]
    })
    ),
    on(MmsIssuesActions.AddIssue, (state, {mmsIssue}) =>({
      ...state,
      issues: [...state.issues, mmsIssue]
    })
    ),
    on(MmsIssuesActions.addNewIssueSuccess, (state, {payload: mmsIssue}) =>({
      ...state,
      issues: [...state.issues, mmsIssue]
    })
    ),
    on(MmsIssuesActions.updateUnitsIssueSuccess, (state, {payload: updatedIssuePayLoad}) =>({
      ...state,
      issues: state.issues.map(issueInStore => {
        // Only call sub reducer if the incoming actions id matches
        if (issueInStore.issueId === updatedIssuePayLoad.issueId ) {
          return updatedIssuePayLoad;
        }
        return issueInStore;
      })
      //[...state.issues, updatedIssuePayLoad]
    })
    ),

    

    on(MmsIssuesActions.UpdateIssue, (state, {updatedIssuePayLoad}) =>{
      const updatedIssue = {
        ...state.issues[updatedIssuePayLoad.index],
        ...updatedIssuePayLoad.newMaintenanceIssue
      };
  
      const updatedIssues = [...state.issues];
      updatedIssues[updatedIssuePayLoad.index] = updatedIssue;
  
        return {
          ...state,
          issues: updatedIssues
        };
    }
    ),
    on(MmsIssuesActions.DeleteIssue, (state, {deleteAtIndex}) =>{
      
      return {
        ...state,
        issues: state.issues.filter((issue, index) => {
          return index !== deleteAtIndex;
        })
      };
     }
    )
  
    
);
  