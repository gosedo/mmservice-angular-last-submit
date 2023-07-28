import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TechTask } from 'src/app/mms-models/techtask.model';
import * as fromAppState from '../../store/state/state-model';
import { map, switchMap } from 'rxjs/operators';
import * as fromTechTasksAction from '../../store/actions/mmstechtask.actions'

@Component({
  selector: 'app-tech-task-detail',
  templateUrl: './tech-task-detail.component.html',
  styleUrls: ['./tech-task-detail.component.css']
})
export class TechTaskDetailComponent implements OnInit {

issueType: string;
unitCode: string;
createdOnDate: Date;
closedOnDate: Date;
taskCreatedBy: string;
taskUpdatedBy: string;
teamAssigned: string;
taskStatus: string;
taskDescr:string;

isDeleteAllowed: boolean = false;

techTaskId: number;
currentTechTask: TechTask;
  authSubscription: any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppState.AppState>) { }

  ngOnInit(): void {

    this.route.params
        .pipe(
          map(params => {
            return +params['id'];
          }),
          switchMap(id => {
            this.techTaskId = id;
            return this.store.select('techtasks');
          }),
          map(techTasksState => {
            
            return techTasksState.techtasks.find((techTask, index) => {
              return techTask.techTaskId === this.techTaskId;
            });
          })
        )
        .subscribe(techTaskFromStore => {
          this.currentTechTask = techTaskFromStore;
          
          this.setDetailViewModel(techTaskFromStore);
                  
        });


        this.authSubscription = this.store.select('auth').pipe( map(state => {
          return state.authInfo.userRoleIds
                                  })).subscribe(
                                  userRoles => {
                                  console.log("Deleted allowed 888888888");
                                  console.log(userRoles.includes(3))
                                  console.log(userRoles);
                                  this.isDeleteAllowed = userRoles.includes(3)  ;
                                  
                                  }
                                  )
  }
  onBackToIssuesList(){
    let navIssueId = this.currentTechTask.issueTaskFor.issueId;
    this.router.navigate(['/issue/'+ navIssueId+'/task/'+ navIssueId+ '/list']);
  }
  onEditTask() {
    
      this.router.navigate(['task/'+this.techTaskId+'/edit'], );
  }

  onDeleteTask(){
    let navIssueId = this.currentTechTask.issueTaskFor.issueId;
    this.store.dispatch(fromTechTasksAction.deleteTechTask({payload: this.techTaskId}));
    this.router.navigate(['/issue/'+ navIssueId+'/task/'+ navIssueId+ '/list']);
  }
  
  setDetailViewModel(techTask: TechTask){
    console.log("From Tech Task Detail setDetailViewModel Method");
    console.log(techTask);
    
    this.issueType = techTask.issueTaskFor.issueType.issueTypeDescr; 
    this.unitCode = techTask.issueTaskFor.requestedBy.tenantUnit.unitCode;
    this.createdOnDate = techTask.createdOnDate;
    this.closedOnDate = techTask.closedOnDate;
    this.taskCreatedBy = techTask.taskCreatedBy.userLastname;
    this.taskUpdatedBy = !!techTask.taskUpdatedBy ? techTask.taskUpdatedBy.userLastname : '';
    this.teamAssigned = techTask.teamAssigned.techTeamDescr;
    this.taskStatus = techTask.taskStatus.taskStatusCode;
    this.taskDescr = techTask.taskDescr;

  }

}
