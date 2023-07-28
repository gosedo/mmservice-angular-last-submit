import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAppState from '../store/state/state-model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-mms-issues',
  templateUrl: './mms-issues.component.html',
  styleUrls: ['./mms-issues.component.css']
})
export class MmsIssuesComponent implements OnInit {

  isInIssueCreateMode: boolean = false;
  
  selectedTournament: number;
  authSubscription: any;
  isAddNewIssueAllowed: any;

  constructor(
    private store: Store<fromAppState.AppState>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.authSubscription = this.store.select('auth').pipe( map(state => {
          return state.authInfo.userRoleIds
                              })).subscribe(
                              userRoles => {
                              this.isAddNewIssueAllowed = userRoles.includes(1)  ;
                              
                              }
                              );
  }

  onNewIssue() {
    this.isInIssueCreateMode = !this.isInIssueCreateMode;
    this.router.navigate(['issue/new']);
  }
  

}
