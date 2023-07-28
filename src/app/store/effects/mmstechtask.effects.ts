import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { createEffect, ofType, Actions  } from "@ngrx/effects";
import * as MmsTechTaskActions from '../actions/mmstechtask.actions'
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import * as fromState from '../state/state-model'
import { TechTask } from "src/app/mms-models/techtask.model";
import { of } from "rxjs";

@Injectable()
export class TechTaskEffects {

updateTechtask = createEffect(() => this.actions$.pipe(
    ofType(MmsTechTaskActions.updateTechTask),
    map(action => action.payload),
    mergeMap(updateTechTaskFormData =>{

        let updatedTechTaskBody = {
            techTaskId: updateTechTaskFormData.techTaskId,
            taskStatusId: updateTechTaskFormData.taskStatusId,
            teamAssignedTeamId: updateTechTaskFormData.teamAssignedTeamId,
            taskUpdatedByUserId: updateTechTaskFormData.taskUpdatedByUserId
        }

            return this.http.post<TechTask>(
                'http://localhost:8080/api/task/mmstechtask-update', updatedTechTaskBody
                                
                ).pipe(
                map(techTask => {
                    return MmsTechTaskActions.updateTechTaskSuccess( {payload: techTask})
                }),
                catchError((errValue) =>
                    of( MmsTechTaskActions.updateTechTaskFail(errValue))
                )
                )
    }
    )
));

deleteTechtask = createEffect(() => this.actions$.pipe(
  ofType(MmsTechTaskActions.deleteTechTask),
  map(action => action.payload),
  mergeMap(deleteTechTaskId =>{

          return this.http.delete<number>(
              'http://localhost:8080/api/task/mmstechtask-delete/'+deleteTechTaskId
                              
              ).pipe(
              map(techTaskId => {
                  return MmsTechTaskActions.deleteTechTaskSuccess( {payload: techTaskId})
              }),
              catchError((errValue) =>
                  of( MmsTechTaskActions.deleteTechTaskFail(errValue))
              )
              )
  }
  )
));
       

loadTechTask = createEffect(()=> this.actions$.pipe(
        ofType(MmsTechTaskActions.loadtechTask),
        switchMap(() => {

            return this.http.get<TechTask[]>(
                                    'http://localhost:8080/api/task/mmstechtask-list'
            ).pipe(
                    map(listOfTechTasks => {
                    return MmsTechTaskActions.loadtechTaskSuccess({ payload: listOfTechTasks});
                    }
                    ),
                    catchError(error => {
                        return of(MmsTechTaskActions.loadtechTaskFail(error))
                    })
                )
        }
      )
));

loadtechTaskByIssueId = createEffect(()=> this.actions$.pipe(
  ofType(MmsTechTaskActions.loadtechTaskByIssueId),
  switchMap((action) => {

      return this.http.get<TechTask[]>(
                              'http://localhost:8080/api/task/mmstechtask/list/'+ action.issueId
      ).pipe(
              map(listOfTechTasks => {
              return MmsTechTaskActions.loadtechTaskSuccess({ payload: listOfTechTasks});
              }
              ),
              catchError(error => {
                  return of(MmsTechTaskActions.loadtechTaskFail(error))
              })
          )
  }
)
));

addNewTechTask = createEffect(() => this.actions$.pipe(
    ofType(MmsTechTaskActions.addNewTechTask),
    map(action => action.payload),
    mergeMap(createTechTaskFormData => {

        let newTechTaskBody = {
          taskDescr: createTechTaskFormData.taskDescr,
          taskForIssueId: createTechTaskFormData.taskForIssueId,
          teamAssignedId: createTechTaskFormData.teamAssignedId,
          taskCreatedByUserId: createTechTaskFormData.taskCreatedByUserId
        }
  
        return this.http.post<TechTask>(
                'http://localhost:8080/api/task/mmstechtask-create', newTechTaskBody
                                  
                ).pipe(
                  map(techTask => {
                    return MmsTechTaskActions.addNewTechTaskSuccess( {payload: techTask})
                  }),
                  catchError((errValue) =>
                    of( MmsTechTaskActions.addNewTechTaskFail(errValue))
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