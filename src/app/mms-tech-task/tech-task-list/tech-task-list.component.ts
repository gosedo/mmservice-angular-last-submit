import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStates from '../../store/state/state-model'
import * as fromTechTasksAction from '../../store/actions/mmstechtask.actions'
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TechTask } from 'src/app/mms-models/techtask.model';
import { TechTaskDetailViewModel } from 'src/app/mms-models/techtaskdetailvm.model';

@Component({
  selector: 'app-tech-task-list',
  templateUrl: './tech-task-list.component.html',
  styleUrls: ['./tech-task-list.component.css']
})
export class TechTaskListComponent implements OnInit {

  subscription:Subscription;
  routesubscription:Subscription;

  taskForIssueId:number;

  listOfTechTasks: TechTask[];
  listOfDetailVM: TechTaskDetailViewModel[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStates.AppState>) { }
  
  ngOnDestroy() {
      this.subscription.unsubscribe();
  }

  ngOnInit(): void {

  this.routesubscription =  this.route.params.pipe(
                                            map(params => { 
                                              this.taskForIssueId = +params['id'];
                                              return +params['id']; }),
                                     ).subscribe(id => {
                                            this.store.dispatch(fromTechTasksAction.loadtechTaskByIssueId({issueId: id}));
                                        });

  this.subscription = this.store
                            .select('techtasks')
                            .pipe(map(techTasksState => techTasksState.techtasks))
                            .subscribe((techTasks: TechTask[]) => {
                            this.listOfTechTasks = techTasks;
                            this.createListWithDetalVM(techTasks);

                            });
    }

  createListWithDetalVM(techTasks: TechTask[]){
    this.listOfDetailVM =[];
    let vm :TechTaskDetailViewModel;

    for(let techTask of techTasks ){
     
      vm = new TechTaskDetailViewModel(
                                    techTask.issueTaskFor.issueType.issueTypeCode,
                                    techTask.issueTaskFor.requestedBy.tenantUnit.unitCode,
                                    techTask.techTaskId,
                                    techTask.createdOnDate,
                                    techTask.teamAssigned.techTeamDescr,
                                    techTask.taskStatus.taskStatusCode,
                                    techTask.closedOnDate,
                                    techTask.taskDescr
                                    ) 
      this.listOfDetailVM.push(vm)
    }

      


  }


}
