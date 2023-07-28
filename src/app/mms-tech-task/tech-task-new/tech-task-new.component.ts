import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAppState from '../../store/state/state-model';
import * as fromTechTaskAction from '../../store/actions//mmstechtask.actions';
import { Subscription } from 'rxjs';
import { TechTeam } from 'src/app/mms-models/techteam.model';
import { MmsTechTaskCreateDTO } from 'src/app/mms-models/techtaskcreate.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MaintenanceIssue } from 'src/app/mms-models/maintenanceissue.model';

@Component({
  selector: 'app-tech-task-new',
  templateUrl: './tech-task-new.component.html',
  styleUrls: ['./tech-task-new.component.css']
})
export class TechTaskNewComponent implements OnInit {

  newTechTaskForm: FormGroup;
  subscriptionStatic: Subscription;
  subscriptionAuth: Subscription;

  listOfTechTeams: TechTeam[];
  techTaskCreatedBy: number;
  selectedTeam: number;
  issueId: number;
  mmsIssue: MaintenanceIssue;

  constructor(private store: Store<fromAppState.AppState>,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnDestroy(): void {
    this.subscriptionStatic.unsubscribe();
    this.subscriptionAuth.unsubscribe();
  }

  ngOnInit(): void {

   this.subscriptionStatic = this.store.select('staticData').subscribe(
      data => this.listOfTechTeams = data.staticData.mmsTechTeams
    );
    
    this.subscriptionAuth = this.store.select('auth').subscribe(
      auth => this.techTaskCreatedBy = auth.authInfo.userId
    );
   // this.initForm();

    this.route.params.pipe(
      map(params => {return +params['issueId']; }),
      switchMap(id => { 
          this.issueId = id; 
          return this.store.select('issues');
      }),
      map(issuesState => {
        return issuesState.issues.find((issue, index) => {
          return issue.issueId === this.issueId; });})
      ).subscribe(maintenanceissue => {
      this.mmsIssue = maintenanceissue;
      
      
    });

    this.initForm();
  }

  onSelect(options){
    this.selectedTeam = +Array.apply(null,options)
      .filter(option => option.selected)
      .map(option => option.value)
  }

  initForm() {
   
    this.newTechTaskForm = new FormGroup({
      taskForIssueId: new FormControl(this.mmsIssue.issueId, Validators.nullValidator),
      issueUnit: new FormControl(this.mmsIssue.requestedBy.tenantUnit.unitCode, Validators.nullValidator),
      issueType: new FormControl(this.mmsIssue.issueType.issueTypeCode, Validators.nullValidator),
      issueDescr: new FormControl(this.mmsIssue.issueDescription, Validators.nullValidator),
      teamAssigned: new FormControl(null, Validators.required),
      techTaskDesr: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

    this.newTechTaskForm.controls['teamAssigned'].setValue(0, {onlySelf: true});
}
get f(){
  return this.newTechTaskForm.controls;
}

 addTechTask(){
    if(!this.newTechTaskForm.valid){
      return;
    }

    let newTechTask : MmsTechTaskCreateDTO = new MmsTechTaskCreateDTO();
    newTechTask.taskForIssueId = this.newTechTaskForm.value.taskForIssueId;
    newTechTask.teamAssignedId = this.newTechTaskForm.value.teamAssigned;
    newTechTask.taskDescr = this.newTechTaskForm.value.techTaskDesr;
    newTechTask.taskCreatedByUserId = this.techTaskCreatedBy;

    this.store.dispatch(fromTechTaskAction.addNewTechTask({payload: newTechTask}));

    this.initForm();

  }

  backToIssue(){
    this.router.navigate(['/issue/'+ this.issueId + '/edit']);
  }

}
