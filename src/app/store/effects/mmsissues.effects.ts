import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from "rxjs/operators";

import { Store } from '@ngrx/store';
import * as MmsIssuesActions from '../actions/mmsissues.actions'
import * as IssuesPageInfoActions from '../actions/issuepageinfo.actions'
import { MaintenanceIssue } from "src/app/mms-models/maintenanceissue.model";
import { MmsIssueCreateDTO } from "src/app/mms-models/issuecreate.model";

import * as fromState from '../state/state-model'
import { merge, of } from "rxjs";
import { MmsIssueResponse } from "src/app/mms-models/pagedissuereponse.model";
import { IssuesPageInfo } from "src/app/mms-models/issuepageinfo.model";



@Injectable()
export class IssueEffects {
  //@Effect()
  fetchIssues = createEffect(()=> this.actions$.pipe(
    ofType(MmsIssuesActions.FetchIssues),
    switchMap(() => {
      console.log("This is in the Issues Effects Fetch");
      return this.http.get<MaintenanceIssue[]>(
        'http://localhost:8080/api/issue/mmsissue-list'
      );
    }),

    //Gosaye review the below codes if the incomeing list of maintenance issues are 
    // map(issues => {
    //   return issues.map(issue => {
    //     return {
    //       ...issue,
    //       createdOnDate: issue.createdOnDate ? issue.createdOnDate : Date.now() 
    //     };
    //   });
    // }),
    map(issues => {
      console.log(issues);
      return MmsIssuesActions.SetIssues({issues});
    })
  )
  );

  fetchIssuesByUserId = createEffect(()=> this.actions$.pipe(
    ofType(MmsIssuesActions.FetchIssuesByUserId),
    switchMap((action) => {
      console.log("This is in the Issues Effects Fetch By User Id");

      
      return this.http.get<MaintenanceIssue[]>(
        'http://localhost:8080/api/issue/mmsissue/list/'+ action.mmsuserId
      );
    }),

    map(issues => {
      console.log(issues);
      return MmsIssuesActions.SetIssues({issues});
    })
  )
  );

  fetchIssuesByUserIdPaged = createEffect(()=> this.actions$.pipe(
    ofType(MmsIssuesActions.FetchIssuesByUserIdPaged),
    switchMap((action) => {
      console.log("This is in the Issues Effects Fetch By User Id");

      let params = new HttpParams();

      if (action.pageParam.pageNo != null && action.pageParam.pageSize != null) {
        params = params.append("issueId", action.issueId.toString());
        params = params.append("startDate", action.startDate.toString());
        params = params.append("endDate", action.endDate.toString());
        params = params.append("pageNo", action.pageParam.pageNo.toString());
        params = params.append("pageSize", action.pageParam.pageSize.toString());
        params = params.append("sortBy", action.pageParam.sortBy.toString());
        params = params.append("sortDir", action.pageParam.sortDir.toString());
      }

      return this.http.get<MmsIssueResponse>(
        'http://localhost:8080/api/issue/mmsissue/list-paged/'+ action.mmsuserId, {params: params}
      ).pipe(
        switchMap(pagedResponse => {
          console.log(pagedResponse.content);
          let issues = pagedResponse.content;
          let pageInfo:IssuesPageInfo = new IssuesPageInfo(pagedResponse.pageNo
                                                          ,pagedResponse.pageSize
                                                          ,pagedResponse.totalElements
                                                          ,pagedResponse.totalPages
                                                          ,pagedResponse.last)
          

          return of(MmsIssuesActions.SetIssues({issues}),
          IssuesPageInfoActions.setPageInfoForIssues({payload: pageInfo}));
          })
      )
    }),

    
  )
  );

  addNewIssues = createEffect(() => this.actions$.pipe(
    ofType(MmsIssuesActions.addNewIssue),
    map(action => action.payload),
    mergeMap(createIssueFormData => {

      let newIssueBody = {
        issueTypeId: createIssueFormData.issueTypeId,
        issueDescr: createIssueFormData.issueDescr,
        requestedByUserId: createIssueFormData.requestedByUserId
      }

      return this.http.post<MaintenanceIssue>(
              'http://localhost:8080/api/issue/mmsissue-create', newIssueBody
                                
              ).pipe(
                map(issue => {
                  return MmsIssuesActions.addNewIssueSuccess( {payload: issue})
                }),
                catchError((errValue) =>
                  of( MmsIssuesActions.addNewIssueFail(errValue))
                )
              )
      //return of(MmsIssuesActions.addNewIssue({payload: createIssueFormData}))
    }
           
    
    )

  ));

  updateUnitsIssues = createEffect(() => this.actions$.pipe(
    ofType(MmsIssuesActions.updateUnitsIssue),
    map(action => action.payload),
    mergeMap(updateIssueFormData => {

      let updatedIssueBody = {
        issueId:updateIssueFormData.issueId,
        issueTypeId: updateIssueFormData.issueTypeId,
        issueStatusId: updateIssueFormData.issueStatusId,
        
      }

      return this.http.post<MaintenanceIssue>(
              'http://localhost:8080/api/issue/mmsissue-update', updatedIssueBody
                                
              ).pipe(
                map(issue => {
                  return MmsIssuesActions.updateUnitsIssueSuccess( {payload: issue})
                }),
                catchError((errValue) =>
                  of( MmsIssuesActions.updateUnitsIssueFail(errValue))
                )
              )
      //return of(MmsIssuesActions.addNewIssue({payload: createIssueFormData}))
    }
           
    
    )

  ));
    
    
  //@Effect({dispatch: false})
  storeMaintenanceIssues = createEffect(() => this.actions$.pipe(
    ofType(MmsIssuesActions.StoreIssues.type),
    withLatestFrom(this.store.select('issues')),
    switchMap(([actionData, issuesState]) => {  
      return this.http.put(
        'https://ng-course-recipe-book-7a169.firebaseio.com/recipes.json',
        issuesState.issues
      );
    })
  )
  , {dispatch: false});

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromState.AppState>
  ) {}
}
