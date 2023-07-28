import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import * as fromAppState from '../../store/state/state-model';
import * as fromIssuesAction from '../../store/actions/mmsissues.actions';
import { MaintenanceIssue } from 'src/app/mms-models/maintenanceissue.model';

import { IssueType } from 'src/app/mms-models/issuetype.model';
import { IssueStatus } from 'src/app/mms-models/issuestatus.model';
import { MmsIssueUpdateDTO } from 'src/app/mms-models/issueupdate.model';

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {
  
  mmsIssue: MaintenanceIssue;
  issueId: number;
  
  issueEditForm: FormGroup;
  issueTypes : IssueType[];
  issueStatuses : IssueStatus[];
  selectedIssueType: number;

  subscriptionStaticIssueType: Subscription;
  subscriptionStaticIssueStatus: Subscription;
  subscriptionAuth: Subscription;
  subscriptionIssue: Subscription;

  requestedByUserId: number;

  //Form Values
    issueType: number;
    unitCode: string;
    dateRequested: Date;
    requestedByUser: string;
    issueStatus:number;
    completedOn: Date;
    issueDescr: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppState.AppState>) { }

  ngOnDestroy(): void {
      this.subscriptionStaticIssueType.unsubscribe();
      this.subscriptionStaticIssueStatus.unsubscribe();
  }

  ngOnInit(): void {
    console.log("From new Isssue component");
    this.subscriptionStaticIssueType = this.store.select('staticData').subscribe(
      data => this.issueTypes = data.staticData.issueTypes
    );

    this.subscriptionStaticIssueStatus = this.store.select('staticData').subscribe(
      data => this.issueStatuses = data.staticData.issueStatuses
    );

    this.route.params
        .pipe(
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
          console.log("From Edit Issue For init ==========");
          console.log(this.mmsIssue);
          this.setDetailViewModel(maintenanceissue);
          this.initForm();
                  
        });
  }


  initForm() {
   
    this.issueEditForm = new FormGroup({
      issueId: new FormControl(this.issueId, Validators.nullValidator),
      unitCode: new FormControl(this.unitCode, Validators.nullValidator),
      issueTypesCtrl: new FormControl(null, Validators.required),
      issueDescr: new FormControl(this.issueDescr, Validators.nullValidator),
      issueStatusesCtrl:  new FormControl(null, Validators.required)
      
    });

    console.log("This is issue type value from edit initform")
    console.log(this.issueType);
    
    this.issueEditForm.controls['issueTypesCtrl'].setValue(this.issueType, {onlySelf: true});
    this.issueEditForm.controls['issueStatusesCtrl'].setValue(this.issueStatus, {onlySelf: true});

  }
  get f(){
    return this.issueEditForm.controls;
  }
  
  updateIssue(){
    if (!this.issueEditForm.valid) {
      return;
    }
    let updatedIssue : MmsIssueUpdateDTO = new MmsIssueUpdateDTO();
    updatedIssue.issueTypeId = this.issueEditForm.value.issueTypesCtrl;
    updatedIssue.issueId = this.issueId;
    updatedIssue.issueStatusId = this.issueEditForm.value.issueStatusesCtrl;

    this.store.dispatch(fromIssuesAction.updateUnitsIssue({payload: updatedIssue}));

  }

  addTask(){
    this.router.navigate(['task/'+this.issueId+'/new'], );
  }
  onBackToIssue(){
    
    this.router.navigate(['/issue/'+this.issueId]);
  }

  onSelect(options){
    this.selectedIssueType = +Array.apply(null,options)
      .filter(option => option.selected)
      .map(option => option.value)
      
  }

  setDetailViewModel(issue: MaintenanceIssue){
    this.issueType = issue.issueType.issueTypeId;
    this.unitCode = issue.requestedBy.tenantUnit.unitCode;
    this.dateRequested = issue.createdOnDate;
    this.requestedByUser = issue.requestedBy.tenantInfo.userFirstname;
    this.issueStatus = issue.issueStatus.issueStatusId;
    this.completedOn = issue.completedOnDate;
    this.issueDescr = issue.issueDescription;
}

}
