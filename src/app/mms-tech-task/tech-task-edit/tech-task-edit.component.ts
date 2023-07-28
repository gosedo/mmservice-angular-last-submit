import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TechTaskStatus } from 'src/app/mms-models/techtaskstatus.model';
import * as fromAppState from '../../store/state/state-model';
import * as fromTechTasksAction from '../../store/actions/mmstechtask.actions'
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TechTask } from 'src/app/mms-models/techtask.model';
import { MmsTechTaskUpdateDTO } from 'src/app/mms-models/techtaskupdate.model';
import { TechTeam } from 'src/app/mms-models/techteam.model';

@Component({
  selector: 'app-tech-task-edit',
  templateUrl: './tech-task-edit.component.html',
  styleUrls: ['./tech-task-edit.component.css']
})
export class TechTaskEditComponent implements OnInit {
  
  techTaskEditForm: FormGroup;
  subTaskStatuses: Subscription;
  subscriptionAuth: Subscription;
  subTaskTeams: Subscription;
  
  techTaskStatuses : TechTaskStatus[];
  techTaskTeams:TechTeam[];
  selectedIssueType: number;

  techTaskId: number;
  currentTechTask: TechTask;
  taskUpdatedByUserId: number;

  issueType: string;
  unitCode: string;
  createdOnDate: Date;
  closedOnDate: Date;
  taskCreatedBy: string;
  //taskUpdatedBy: string;
  //teamAssigned: string;
  //taskStatus: string;
  //taskDescr:string;

 constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppState.AppState>) { }

  ngOnDestroy(): void {
      this.subTaskStatuses.unsubscribe();
      this.subTaskTeams.unsubscribe();
      this.subscriptionAuth.unsubscribe();
  }

  ngOnInit(): void {

  this.subTaskStatuses = this.store.select('staticData').subscribe(
            data => this.techTaskStatuses = data.staticData.mmsTaskStatuses
          );

  this.subTaskTeams = this.store.select('staticData').subscribe(
            data => this.techTaskTeams = data.staticData.mmsTechTeams
          );
  this.subscriptionAuth = this.store.select('auth').subscribe(
            auth => this.taskUpdatedByUserId = auth.authInfo.userId
          );

  this.route.params.pipe(
            map(params => { return +params['id']; }),
            switchMap(id => {
              this.techTaskId = id;
              return this.store.select('techtasks');
            }),
            map(techTaskState => {
              return techTaskState.techtasks.find((techTask, index) => {
                return techTask.techTaskId === this.techTaskId;
              });
            })
          )
          .subscribe(techTask => {
            this.currentTechTask = techTask;
            this.setDetailViewModel(techTask);
            this.initForm();
           });
 }
  updateTechtask(){

    if(!this.techTaskEditForm.valid){
      return;
    }

    let updatedTechTask : MmsTechTaskUpdateDTO = new MmsTechTaskUpdateDTO();
    updatedTechTask.techTaskId = this.techTaskId
    updatedTechTask.taskStatusId = this.techTaskEditForm.value.techTaskStatusesCtrl;
    updatedTechTask.taskUpdatedByUserId = this.taskUpdatedByUserId;
    updatedTechTask.teamAssignedTeamId = this.techTaskEditForm.value.techTaskTeamCtrl;

    this.store.dispatch(fromTechTasksAction.updateTechTask({payload: updatedTechTask}));

  }

  onSelect(options){
    this.selectedIssueType = +Array.apply(null,options)
      .filter(option => option.selected)
      .map(option => option.value)
      
  }

  initForm() {
   
    this.techTaskEditForm = new FormGroup({
          unitCode: new FormControl(this.unitCode, Validators.nullValidator),
          techTaskStatusesCtrl: new FormControl(null, Validators.required),
          techTaskTeamCtrl: new FormControl(null, Validators.required),
          techTaskDescr: new FormControl(this.currentTechTask.taskDescr, Validators.nullValidator)
    });
    
    this.techTaskEditForm.controls['techTaskStatusesCtrl'].setValue(this.currentTechTask.taskStatus.taskStatusId, {onlySelf: true});
    this.techTaskEditForm.controls['techTaskTeamCtrl'].setValue(this.currentTechTask.teamAssigned.techTeamId, {onlySelf: true});
    
  }
  get f(){
    return this.techTaskEditForm.controls;
  }

  onBackToIssuesList(){
    this.router.navigate(['/task/'+this.techTaskId]);
  }

  setDetailViewModel(techTask: TechTask){
    
    this.issueType = techTask.issueTaskFor.issueType.issueTypeDescr; 
    this.unitCode = techTask.issueTaskFor.requestedBy.tenantUnit.unitCode;
    this.createdOnDate = techTask.createdOnDate;
    this.closedOnDate = techTask.closedOnDate;
    this.taskCreatedBy = techTask.taskCreatedBy.userLastname;
    

  }

}
