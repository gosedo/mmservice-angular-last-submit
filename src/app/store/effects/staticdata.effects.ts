import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as fromStaticDataActions from '../actions/staticdata.actions';
import { catchError, map, mergeMap } from "rxjs/operators";
import { StaticData } from "src/app/mms-models/staticdata.model";
import { of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class StaticDataEffects {

  loadStaticData$ = createEffect(() => this.actions$.pipe(
    ofType(fromStaticDataActions.loadStaicData),
    mergeMap(() =>
      this.http.get<StaticData>(
        'http://localhost:8080/api/staticdata/allstaticdata'
      ).pipe(
        map(
          (data: StaticData) =>
          fromStaticDataActions.loadStaicDataSuccess({ payload: data })
        ),
        catchError((error) => of(fromStaticDataActions.loadStaicDataFail({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}
}