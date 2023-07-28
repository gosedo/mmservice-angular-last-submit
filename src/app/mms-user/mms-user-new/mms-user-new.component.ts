import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UsrRoleType } from 'src/app/mms-models/userrole.model';
import * as fromAppState from '../../store/state/state-model';
import { MmsUserCreateDTO } from 'src/app/mms-models/usercreate.model';
import * as MmsUserActions from '../../store/actions/mmsuser.actions';
import { MmsUnit } from 'src/app/mms-models/mmsunit.model';
import { TechTeam } from 'src/app/mms-models/techteam.model';

@Component({
  selector: 'app-mms-user-new',
  templateUrl: './mms-user-new.component.html',
  styleUrls: ['./mms-user-new.component.css']
})
export class MmsUserNewComponent implements OnInit {

  
  newUserForm: FormGroup;
  listOfUserRoles: UsrRoleType[];
  selectedRole: number;
  subscriptionStatic: any;
  phoneNumberPattern: string ='^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$';
  isTenant: boolean;
  isTechnician: boolean;
  isManager: boolean;
  listOfPropUnits: MmsUnit[];
  listOfTeams: TechTeam[];
  selectedUnit: number;
  selectedTeam: number;
  


  constructor(private store: Store<fromAppState.AppState>,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.subscriptionStatic = this.store.select('staticData').subscribe(
      data => this.listOfUserRoles = data.staticData.mmsUserTypes
    );
    this.initForm();
  
  }

  
  initForm() {
   
    this.newUserForm = new FormGroup({
      userFirstname: new FormControl(null, Validators.required),
      userLastname: new FormControl(null, Validators.required),
      userEmail: new FormControl(null, [Validators.required, Validators.email]),
      userPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      userPhone: new FormControl(null, [Validators.required, Validators.pattern("^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$")]),
      userRolesCtrl: new FormControl(null, Validators.required)
      
    });

    this.newUserForm.controls['userRolesCtrl'].setValue(0, {onlySelf: true});
  }

  get f(){
    return this.newUserForm.controls;
  }
  onUnitSelect(options){

    this.selectedUnit = +Array.apply(null,options)
    .filter(option => option.selected)
    .map(option => option.value)

  }
  onTeamSelect(options){

    this.selectedTeam = +Array.apply(null,options)
    .filter(option => option.selected)
    .map(option => option.value)

  }
  onRoleSelect(options){
    this.selectedRole = +Array.apply(null,options)
      .filter(option => option.selected)
      .map(option => option.value)


      if(this.selectedRole == 1){
        
        this.subscriptionStatic = this.store.select('staticData').subscribe(
          data => {
            this.listOfPropUnits = data.staticData.mmsProperyUnits;
          this.newUserForm.addControl('propertyUnitsCtrl', new FormControl('', Validators.required));
          } 
        );
      

        
      }else if(this.selectedRole == 2){

        this.subscriptionStatic = this.store.select('staticData').subscribe(
          data => {
            this.listOfTeams = data.staticData.mmsTechTeams;
            this.newUserForm.addControl('techTeamsCtrl', new FormControl('', Validators.required)); 
          } 
        );

        
      }

      


  }
  
  
  createUser(){
    
    if(!this.newUserForm.valid){
      return;
    }

    let userTeamParam = !!this.newUserForm.value.techTeamsCtrl ?
                                    this.newUserForm.value.techTeamsCtrl : null;

    let userUnitParam = !!this.newUserForm.value.propertyUnitsCtrl ?
                                    this.newUserForm.value.propertyUnitsCtrl : null;

    let newUser : MmsUserCreateDTO = new MmsUserCreateDTO(
                                              this.newUserForm.value.userEmail,
                                              this.newUserForm.value.userPassword,
                                              this.newUserForm.value.userFirstname,
                                              this.newUserForm.value.userLastname,
                                              this.newUserForm.value.userPhone,
                                              this.newUserForm.value.userRolesCtrl,
                                              userTeamParam,
                                              userUnitParam
                                              );

    this.store.dispatch(MmsUserActions.addNewUser({payload: newUser}));

    this.initForm();

  }

  backToIssue(){
    this.router.navigate(['/user']);
  }


}
