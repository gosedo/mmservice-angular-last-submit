import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MaintenanceIssue } from 'src/app/mms-models/maintenanceissue.model';
import { MmsSpringBootService } from 'src/app/mms-springboot.service';
import * as fromAppState from '../../store/state/state-model';

import { DetailViewModel } from './issuedetail.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit, OnDestroy {
  mmsIssue: MaintenanceIssue;
  issueId: number;
  isEditAllowed: boolean = false;
  isShowTaskAllowed: boolean = false; 

  authSubscription: Subscription;
 
  //issueDetail: DetailViewModel;

    issueType: string;
    unitCode: string;
    dateRequested: Date;
    requestedByUser: string;
    issueStatus:string;
    completedOn: Date;
    issueDescr: string;
  routeScubsription: Subscription;
  


  constructor(private route: ActivatedRoute,
    private router: Router,
    private mmsService: MmsSpringBootService,
    private store: Store<fromAppState.AppState>) { }

    ngOnInit(): void {
     this.routeScubsription =  this.route.params.pipe(
          map(params => {
            return +params['id'];
          }),
          switchMap(id => {
            this.issueId = id;
            return this.store.select('issues');
          }),
          map(issuesState => {
            console.log(issuesState);
            return issuesState.issues.find((issue, index) => {
              return issue.issueId === this.issueId;
            });
          })
        )
        .subscribe(maintenanceissue => {
          this.mmsIssue = maintenanceissue;
          console.log("From Detail ==========");
          console.log(this.mmsIssue);
          this.setDetailViewModel(maintenanceissue);
                  
        });

        this.authSubscription = this.store.select('auth').pipe( map(state => {
                      return state.authInfo.userRoleIds
        })).subscribe(
          userRoles => {
            this.isEditAllowed = userRoles.includes(3)  ;
            this.isShowTaskAllowed = userRoles.includes(2) || userRoles.includes(3);
          }
        )

        
    }


  ngOnDestroy() {
        this.authSubscription.unsubscribe();
        this.routeScubsription.unsubscribe();
   }
  
  onEditIssue() {
    this.router.navigate(['issue/'+this.issueId+'/edit'], );

  }

  onShowTasks(){
    this.router.navigate(['task/'+ this.issueId +'/list'],{relativeTo: this.route} );
    //this.router.navigate(['task/list'],{relativeTo: this.route} );
  }

  onBackToIssuesList(){
    this.router.navigate(['/issue']);
  }
  
  
  setDetailViewModel(issue: MaintenanceIssue){
        this.issueType = issue.issueType.issueTypeCode;
        this.unitCode = issue.requestedBy.tenantUnit.unitCode;
        this.dateRequested = issue.createdOnDate;
        this.requestedByUser = issue.requestedBy.tenantInfo.userFirstname;
        this.issueStatus = issue.issueStatus.issueStatusCode;
        this.completedOn = issue.completedOnDate;
        this.issueDescr = issue.issueDescription;
  }

}
