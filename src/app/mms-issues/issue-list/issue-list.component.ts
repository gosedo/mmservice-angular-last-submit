import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MaintenanceIssue } from 'src/app/mms-models/maintenanceissue.model';
import { MmsSpringBootService } from 'src/app/mms-springboot.service';
import { IssueDetailViewModel } from 'src/app/mms-models/issuedetailvm.model';
import * as IssuesActions from '../../store/actions/mmsissues.actions';
import * as fromStates from '../../store/state/state-model'
import { Store } from '@ngrx/store';
import { MmsPageParam } from 'src/app/mms-models/pageparam.model';
import { IssuesPageInfo } from 'src/app/mms-models/issuepageinfo.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit, OnDestroy {

  listOfIssues: MaintenanceIssue[];
  subscription: Subscription;
  authSubscription: Subscription;

  listOfDetailVM: IssueDetailViewModel[] = [];
  pageInfoSubscription: Subscription;
  currentPageState: IssuesPageInfo;

  isFirstPage: boolean = true;
  isLastPage: boolean = true;
  issueSearchForm: FormGroup;

  currentUserId: number;
  currentPage: number;
  totalPages:number;
  
  issueIdParam = 0;
  issuesSearchStartDate: string = new Date(new Date().setDate(new Date().getDate() -15)).toISOString();
  issuesSearchEndDate: string = new Date().toISOString();
   

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mmsService: MmsSpringBootService,
    private store: Store<fromStates.AppState>) { 

      this.authSubscription = Subscription.EMPTY;
      this.subscription = Subscription.EMPTY;
  }

  ngOnInit(): void {

    this.getIssuesFromStateStore();

    this.authSubscription =  this.store.select('auth').subscribe(authInfo =>{
      if(authInfo.authInfo){
        this.currentUserId = authInfo.authInfo.userId
      }
      
    });

    this.setupCurrentPageInfoForUI();

    this.initForm();

  }

  initForm() {
  
    this.issueSearchForm = new FormGroup({
        
        startDate: new FormControl(null, Validators.nullValidator),
        endDate: new FormControl(null, Validators.nullValidator),
        searchIssueId:new FormControl(null, Validators.nullValidator)
      
    });
    
  }

  searchByCreatedDate(){
      
      let pageParamPrev: MmsPageParam = new MmsPageParam(0,3,"createdOnDate","desc");

      this.setSearchDatesFromForm();
      
      this.store.dispatch(IssuesActions.FetchIssuesByUserIdPaged({mmsuserId:this.currentUserId
                                                      ,issueId: this.issueIdParam
                                                      , startDate:this.issuesSearchStartDate
                                                      , endDate: this.issuesSearchEndDate 
                                                      , pageParam: pageParamPrev}));
  }

  prevPage(){

    if(this.currentPageState){           
    let pageParamPrev: MmsPageParam = new MmsPageParam(this.currentPageState.pageNo-1
                                            ,this.currentPageState.pageSize,"createdOnDate","desc");

    this.setSearchDatesFromForm();

    this.store.dispatch(IssuesActions.FetchIssuesByUserIdPaged({mmsuserId:this.currentUserId
                                                  , issueId: this.issueIdParam
                                                  , startDate:this.issuesSearchStartDate
                                                  , endDate: this.issuesSearchEndDate 
                                                  , pageParam: pageParamPrev}));
    this.getIssuesFromStateStore();
    
    this.setupCurrentPageInfoForUI();
    }
    
  }

  nextPage(){

    if(this.currentPageState){

      let pageParamPrev: MmsPageParam = new MmsPageParam(this.currentPageState.pageNo + 1
        ,this.currentPageState.pageSize,"createdOnDate","desc");
      
    this.setSearchDatesFromForm();
  
    this.store.dispatch(IssuesActions.FetchIssuesByUserIdPaged({mmsuserId:this.currentUserId
                                                        , issueId: this.issueIdParam
                                                        , startDate:this.issuesSearchStartDate
                                                        , endDate: this.issuesSearchEndDate 
                                                        , pageParam: pageParamPrev}));

    this.getIssuesFromStateStore();

    this.setupCurrentPageInfoForUI();

    }
      
  }

  setupCurrentPageInfoForUI(){

      this.pageInfoSubscription =  this.store.select('issuesPageInfo').subscribe(pageInfo =>{
                                          if(pageInfo.issuesPageInfo){

                                            this.currentPageState = pageInfo.issuesPageInfo;
                                            this.isFirstPage = pageInfo.issuesPageInfo.pageNo == 0 ? true : false;
                                            this.isLastPage = pageInfo.issuesPageInfo.last;

                                            this.currentPage = pageInfo.issuesPageInfo.pageNo;
                                            this.totalPages = pageInfo.issuesPageInfo.totalPages;
                                          }
                                            
                                          });
  }

  getIssuesFromStateStore(){

       this.subscription = this.store
                          .select('issues')
                          .pipe(map(issuesState => issuesState.issues))
                          .subscribe((issues: MaintenanceIssue[]) => {
                            
                            this.listOfIssues = issues;
                            console.log(issues);
                            this.createListWithDetalVM(issues);

                          });

  }

  setSearchDatesFromForm(){

    if(!!this.issueSearchForm.value.startDate && !!this.issueSearchForm.value.endDate){
      this.issuesSearchStartDate = this.issueSearchForm.value.startDate+":00.000Z";
      this.issuesSearchEndDate = this.issueSearchForm.value.endDate+":00.000Z";
    }
    
    this.issueIdParam = !!this.issueSearchForm.value.searchIssueId ? this.issueSearchForm.value.searchIssueId : 0 ;
  }

  ngOnDestroy() {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
    if(this.subscription){
      this.subscription.unsubscribe();
    }
          
  }

  createListWithDetalVM(listOfIssues: MaintenanceIssue[]){
    
    this.listOfDetailVM = [];

    let vm : IssueDetailViewModel

    for(let issue of listOfIssues ){
     
      vm = new IssueDetailViewModel(
                                    issue.issueId,
                                    issue.issueType.issueTypeCode,
                                    issue.requestedBy.tenantUnit.unitCode,
                                    issue.createdOnDate,
                                    issue.requestedBy.tenantInfo.userFirstname,
                                    issue.issueStatus.issueStatusCode,
                                    issue.completedOnDate,
                                    issue.issueDescription
                                    ) 
      this.listOfDetailVM.push(vm)
    }
    console.log("From createListWithDetalVM");
    console.log(this.listOfDetailVM);

    
   }

}
