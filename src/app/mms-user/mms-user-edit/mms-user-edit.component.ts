import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAppState from '../../store/state/state-model';
import * as fromUsersAction from '../../store/actions/mmsuser.actions';
import { UserStatus } from 'src/app/mms-models/userstatus.model';
import { map, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'c:/Users/gosay/Documents/Before Lenevo MotherBoardFix/repo Projects/maintenance-mgmt-sys/src/app/mms-models/user.model';
import { MmsUserUpdateDTO } from 'src/app/mms-models/userupdate.model';

@Component({
  selector: 'app-mms-user-edit',
  templateUrl: './mms-user-edit.component.html',
  styleUrls: ['./mms-user-edit.component.css']
})
export class MmsUserEditComponent implements OnInit {
  subscriptionStaticUserStatus: any;
  userStatuses: UserStatus[];
  userId: number;
  mmsUser: User;
  userEditForm: FormGroup;
  userIdSetCtrl: any;
  userFirstnameSetCtrl: any;
  userStatusSetCtrl: any;
  userEmailSetCtrl: any;
  userLastnameSetCtrl: any;
  selectedUserStaus: number;
  userPhoneSetCtrl: any;
  isChangePassword : boolean = false;
  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppState.AppState>) { }

  ngOnDestroy(): void {
      
      this.subscriptionStaticUserStatus.unsubscribe();
  }
  ngOnInit(): void {

    this.subscriptionStaticUserStatus = this.store.select('staticData').subscribe(
      data => this.userStatuses = data.staticData.mmsUserStatuses
    );

    this.route.params
        .pipe(
          map(params => {
            return +params['id'];
          }),
          switchMap(id => {
            this.userId = id;
            return this.store.select('mmsusersinstore');
          }),
          map(usersState => {
            console.log(usersState);
            return usersState.mmsUsers.find((userP, index) => {
              return userP.userId === this.userId;
            });
          })
        )
        .subscribe(userFromStore => {
          this.mmsUser = userFromStore;
          console.log("From Edit Issue For init ==========");
          console.log(this.mmsUser);
          this.setDetailViewModel(userFromStore);
          this.initForm();
                  
        });

  }


  initForm() {
   
    this.userEditForm = new FormGroup({
      userIdCtrl: new FormControl(this.userIdSetCtrl, Validators.nullValidator),
      userFirstnameVMCtrl: new FormControl(this.userFirstnameSetCtrl, Validators.required),
      userLastnameVMCtrl: new FormControl(this.userLastnameSetCtrl, Validators.required),
      userPhoneVMCtrl: new FormControl(this.userPhoneSetCtrl, Validators.required),
      userEmailVMCtrl: new FormControl(this.userEmailSetCtrl, Validators.required),
      userPasswordVMCtrl:  new FormControl({value:null,disabled: true} ,Validators.nullValidator),
      isNewPasswordVMCtrl:  new FormControl(null, Validators.nullValidator),
      userStatusVMCtrl:  new FormControl(null, Validators.required),
      
    });
    
    this.userEditForm.controls['userStatusVMCtrl'].setValue(this.userStatusSetCtrl, {onlySelf: true});

  }

  get f(){
    return this.userEditForm.controls;
  }

  enableChangePassword(){
    this.isChangePassword = !this.isChangePassword;

    if(this.isChangePassword){
      this.userEditForm.controls['userPasswordVMCtrl'].enable();
    }else{
      this.userEditForm.controls['userPasswordVMCtrl'].disable();
    }
    

    console.log("Change password");
    console.log(this.isChangePassword);
  }

  updateUser(){
    if (!this.userEditForm.valid) {
      return;
    }

    console.log("update passed validation in user update");
    
    let rolesArray: number[] = [];
    rolesArray[0] = this.mmsUser.userRoles[0].usrRoleId;

    let userIdParam = this.userId;
    let userEmailParam = this.userEditForm.value.userEmailVMCtrl;
    let userPhoneParam = this.userEditForm.value.userPhoneVMCtrl;
    let userFirstnameParam = this.userEditForm.value.userFirstnameVMCtrl;
    let userLastnameParam = this.userEditForm.value.userLastnameVMCtrl;
    let userStatusParam = this.userEditForm.value.userStatusVMCtrl;
    let userRolesParam = rolesArray;
    let userPasswordParam = null;

    if(this.userEditForm.value.isNewPasswordVMCtrl){
      userPasswordParam = this.userEditForm.value.userPasswordVMCtrl;
    }



    let updatedUser : MmsUserUpdateDTO = new MmsUserUpdateDTO(
      userIdParam,userEmailParam,userPasswordParam,userFirstnameParam,
      userLastnameParam,userPhoneParam,userRolesParam,userStatusParam
    );
    
    this.store.dispatch(fromUsersAction.updateMmsUser({payload: updatedUser}));

  }

  onBackToUser(){
    
    this.router.navigate(['/user/'+this.userId]);
  }

  onSelect(options){
    this.selectedUserStaus = +Array.apply(null,options)
      .filter(option => option.selected)
      .map(option => option.value)
      
  }
  setDetailViewModel(userP: User){
    this.userIdSetCtrl = userP.userId;
    this.userEmailSetCtrl = userP.userEmail;
    this.userPhoneSetCtrl = userP.userPhone;
    this.userFirstnameSetCtrl = userP.userFirstname;
    this.userLastnameSetCtrl = userP.userLastname;
    this.userStatusSetCtrl = userP.userStatus.userStatusId;
    
  }



}
