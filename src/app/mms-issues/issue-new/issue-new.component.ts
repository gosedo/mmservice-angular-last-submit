import { Component, OnDestroy, OnInit } from '@angular/core';
import * as fromAppState from '../../store/state/state-model';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IssueType } from 'src/app/mms-models/issuetype.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MmsIssueCreateDTO } from 'src/app/mms-models/issuecreate.model';
import * as fromIssuesAction from '../../store/actions/mmsissues.actions';
import { Router } from '@angular/router';
import { MmsPageParam } from 'src/app/mms-models/pageparam.model';
import * as IssuesActions from '../../store/actions/mmsissues.actions';


@Component({
  selector: 'app-issue-new',
  templateUrl: './issue-new.component.html',
  styleUrls: ['./issue-new.component.css']
})
export class IssueNewComponent implements OnInit, OnDestroy {

  newIssueForm: FormGroup;
  selectedIssueType: number;
  subscriptionStatic: Subscription;
  subscriptionAuth: Subscription;
  subscriptionIssue: Subscription;

  issueTypes : IssueType[];
  requestedByUserId: number;
  authSubscription: any;
  currentUserId: number;
  
  constructor(private store: Store<fromAppState.AppState>,
    private router: Router,) { }
  
  ngOnDestroy(): void {
    this.subscriptionStatic.unsubscribe();
    this.subscriptionAuth.unsubscribe();

    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    console.log("From new Isssue component");
    this.subscriptionStatic = this.store.select('staticData').subscribe(
      data => this.issueTypes = data.staticData.issueTypes
    );
    
    this.subscriptionAuth = this.store.select('auth').subscribe(
      auth => this.requestedByUserId = auth.authInfo.userId
    );
    this.initForm();
    console.log(this.issueTypes);
  }

  initForm() {
    
    this.newIssueForm = new FormGroup({
      issueTypesCtrl: new FormControl(null, Validators.required),
      issueDescr: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      
    });

    this.newIssueForm.controls['issueTypesCtrl'].setValue(0, {onlySelf: true});
  }
  get f(){
    return this.newIssueForm.controls;
  }

  onSelect(options){
    this.selectedIssueType = +Array.apply(null,options)
      .filter(option => option.selected)
      .map(option => option.value)
  }

  AddNewIssue(){

    if(!this.newIssueForm.valid){
      return;
    }
    
    let newIssue : MmsIssueCreateDTO = new MmsIssueCreateDTO();
    newIssue.issueTypeId = this.newIssueForm.value.issueTypesCtrl;
    newIssue.issueDescr = this.newIssueForm.value.issueDescr;
    newIssue.requestedByUserId = this.requestedByUserId;

    this.store.dispatch(fromIssuesAction.addNewIssue({payload: newIssue}));


    this.authSubscription =  this.store.select('auth').subscribe(authInfo =>{
      if(authInfo.authInfo){
        this.currentUserId = authInfo.authInfo.userId

        let pageParamPrev: MmsPageParam = new MmsPageParam(0,3,"createdOnDate","desc");

        let startDate = new Date(new Date().setDate(new Date().getDate() -15)).toISOString();;
        let endDate = new Date().toISOString();;

        this.store.dispatch(IssuesActions.FetchIssuesByUserIdPaged({mmsuserId:this.currentUserId
                                                              , issueId: 0
                                                              , startDate:startDate
                                                              , endDate: endDate 
                                                              , pageParam: pageParamPrev}));
      }
      
    })
    
    this.initForm();
    
  }
 
  onBackToIssuesList(){
    this.router.navigate(['/issue']);
  }
 
}
