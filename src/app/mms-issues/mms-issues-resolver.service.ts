import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as StaticDataActions from '../store/actions/staticdata.actions';
import * as IssuesActions from '../store/actions/mmsissues.actions';
import * as fromApp from '../store/state/state-model'
import { StaticData } from '../mms-models/staticdata.model';
import { MmsPageParam } from '../mms-models/pageparam.model';



@Injectable({ providedIn: 'root' })
export class MmsIssuesResolverService implements Resolve<StaticData> {
  authSubscription: any;
  currentUserId: number;
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    this.authSubscription =  this.store.select('auth').subscribe(authInfo =>{
      if(authInfo.authInfo){
        this.currentUserId = authInfo.authInfo.userId

        let pageParamPrev: MmsPageParam = new MmsPageParam(0,3,"createdOnDate","desc");

        let startDate = new Date(new Date().setDate(new Date().getDate() -15)).toISOString();;
        let endDate = new Date().toISOString();;

        this.store.dispatch(IssuesActions.FetchIssuesByUserIdPaged({mmsuserId:this.currentUserId
                                                                    , issueId:0
                                                                    , startDate:startDate
                                                                    , endDate: endDate 
                                                                    , pageParam: pageParamPrev}));
      }
      
    })
    
    
  
    // return this.actions$.pipe(
    //     ofType(IssuesActions.SetIssues),
    //     switchMap(()=>{
    //     })

    // )
    //below would be static if any thing goes wrong
    return this.store.select('staticData').pipe(
      take(1),
      map(state => {
        return state.staticData;
      }),
      switchMap(staticData => {
        if (!staticData) {
          this.store.dispatch(StaticDataActions.loadStaicData());
          return this.actions$.pipe(
            ofType(StaticDataActions.loadStaicDataSuccess.type),
            take(1)
         );
        } else {
          return of(staticData);
        }
      })
    );
    
  }
}
