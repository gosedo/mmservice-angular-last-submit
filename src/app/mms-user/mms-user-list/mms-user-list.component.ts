import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/mms-models/user.model';
import * as fromStates from '../../store/state/state-model'
import * as UsersActions from '../../store/actions/mmsuser.actions'
import { UsersPageInfo } from 'src/app/mms-models/userspageinfo.model';
import { map } from 'rxjs/operators';
import { MmsPageParam } from 'src/app/mms-models/pageparam.model';
import { UserDetailViewModel } from 'src/app/mms-models/userdetailvm.model';


@Component({
  selector: 'app-mms-user-list',
  templateUrl: './mms-user-list.component.html',
  styleUrls: ['./mms-user-list.component.css']
})
export class MmsUserListComponent implements OnInit {

  listOfUsers: User[];
  subscription: Subscription;
  authSubscription: Subscription;

  pageInfoSubscription: Subscription;
  currentPageState: UsersPageInfo;

  isFirstPage: boolean = true;
  isLastPage: boolean = true;
  userSearchForm: FormGroup;

  currentUserId: number;
  currentPage: number;
  totalPages:number;
  
  userEmailParam = null;
  userFirstNameParam: string = null;
  userLastNameParam: string = null;
  listOfDetailVM: any[];
   


  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromStates.AppState>) {

      this.authSubscription = Subscription.EMPTY;
      this.subscription = Subscription.EMPTY;
     
  }

  ngOnInit(): void {

    this.getUsersFromStateStore();

      this.authSubscription =  this.store.select('auth').subscribe(authInfo =>{
        if(authInfo.authInfo){
          this.currentUserId = authInfo.authInfo.userId
        }
        
      });

      this.setupCurrentPageInfoForUI();

      this.initForm();
  }

  
  initForm() {
   
    this.userSearchForm = new FormGroup({
        
      searchUserEmail: new FormControl(null, Validators.nullValidator),
      searchFirstname: new FormControl(null, Validators.nullValidator),
      searchLastname:new FormControl(null, Validators.nullValidator)
     
    });
    
  }

  searchByFilters(){
    
    let pageParamPrev: MmsPageParam = new MmsPageParam(0,5,"userLastname","asc");

    this.setSearchDataFromForm();
        
    this.store.dispatch(UsersActions.loadMmsUsersPaged({userFirstname:this.userFirstNameParam
                                                        , userLastname:this.userLastNameParam
                                                        , userEmail:this.userEmailParam
                                                        , pageParam: pageParamPrev}));

  }

  prevPage(){

    if(this.currentPageState){           
    let pageParamPrev: MmsPageParam = new MmsPageParam(this.currentPageState.pageNo-1
                                            ,this.currentPageState.pageSize,"userLastname","asc");

    this.setSearchDataFromForm();
     
    this.store.dispatch(UsersActions.loadMmsUsersPaged({userFirstname:this.userFirstNameParam
                                                      , userLastname:this.userLastNameParam
                                                      , userEmail:this.userEmailParam
                                                      , pageParam: pageParamPrev}));

    this.getUsersFromStateStore();
    
    this.setupCurrentPageInfoForUI();
    }
    
  }

  nextPage(){

    if(this.currentPageState){

    let pageParamPrev: MmsPageParam = new MmsPageParam(this.currentPageState.pageNo + 1
                                                      ,this.currentPageState.pageSize,"userLastname","asc");
      
    this.setSearchDataFromForm();

    this.store.dispatch(UsersActions.loadMmsUsersPaged({userFirstname:this.userFirstNameParam
                                                          , userLastname:this.userLastNameParam
                                                          , userEmail:this.userEmailParam
                                                          , pageParam: pageParamPrev}));

    this.getUsersFromStateStore();

    this.setupCurrentPageInfoForUI();

    }
      
  }

  setupCurrentPageInfoForUI(){

    this.pageInfoSubscription =  this.store.select('usersPageInfo').subscribe(pageInfo =>{
                                        if(pageInfo.usersPageInfo){

                                          this.currentPageState = pageInfo.usersPageInfo;
                                          this.isFirstPage = pageInfo.usersPageInfo.pageNo == 0 ? true : false;
                                          this.isLastPage = pageInfo.usersPageInfo.last;

                                          this.currentPage = pageInfo.usersPageInfo.pageNo;
                                          this.totalPages = pageInfo.usersPageInfo.totalPages;
                                        }
                                          
                                        });
  }

  getUsersFromStateStore(){

    this.subscription = this.store
                      .select('mmsusersinstore')
                      .pipe(map(userstate => userstate.mmsUsers))
                      .subscribe((users: User[]) => {
                        
                        this.listOfUsers = users;
                        console.log(users);
                        this.createListWithDetalVM(users);

                      });
  }

  setSearchDataFromForm(){
    console.log("Search clicked  66666666666666666");
    console.log(this.userSearchForm.controls);

    this.userFirstNameParam = !!this.userSearchForm.value.searchFirstname ? 
                                  this.userSearchForm.value.searchFirstname : null;

    this.userLastNameParam =  !!this.userSearchForm.value.searchLastname ?
                                        this.userSearchForm.value.searchLastname: null;
                                        
    this.userEmailParam = !!this.userSearchForm.value.searchUserEmail ?
                                  this.userSearchForm.value.searchUserEmail: null;
    
  }

  createListWithDetalVM(listOfusersParam: User[]){
    
    this.listOfDetailVM = [];

    let vm : UserDetailViewModel;

    for(let userl of listOfusersParam ){
     

    vm = new UserDetailViewModel(
                                    userl.userId,
                                    userl.userEmail,
                                    userl.userFirstname,
                                    userl.userLastname,
                                    userl.userStatus.userStatusDescr,
                                    userl.userRoles[0].usrRoleDescr,
                                    userl.isVerified
                                    ) 
      this.listOfDetailVM.push(vm)
    }
    console.log("From createListWithDetalVM");
    console.log(this.listOfDetailVM);

    
   }
    



}
