import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { MmsPageParam } from "src/app/mms-models/pageparam.model";
import { User } from "src/app/mms-models/user.model";
import * as fromApp from '../../store/state/state-model';
import * as UsersActions from '../../store/actions/mmsuser.actions';
import { map, switchMap, take } from "rxjs/operators";
import * as StaticDataActions from '../../store/actions/staticdata.actions';
import { of } from "rxjs";
import { StaticData } from "src/app/mms-models/staticdata.model";



@Injectable({ providedIn: 'root' })
export class MmsUsersResolverService implements Resolve<StaticData> {
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

                let pageParamPrev: MmsPageParam = new MmsPageParam(0,5,"userLastname","asc");

                let firstNameParam = null;
                let lastNameParam = null;

                this.store.dispatch(UsersActions.loadMmsUsersPaged({userFirstname:null
                                                                    , userLastname:null
                                                                    , userEmail:null
                                                                    , pageParam: pageParamPrev}));
            }
        
        })
    
    
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
