import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAppState from '../../store/state/state-model';
import { map, switchMap } from 'rxjs/operators';
import { MmsUserActivationDTO } from 'src/app/mms-models/useractivation.model';
import * as MmsUserActions from '../../store/actions/mmsuser.actions';
import { MatchPasswordValidator } from './passconfirm.validators';

@Component({
  selector: 'app-mms-user-verify',
  templateUrl: './mms-user-verify.component.html',
  styleUrls: ['./mms-user-verify.component.css']
})
export class MmsUserVerifyComponent implements OnInit {
  newUserVerifyForm: FormGroup;
  activationId: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppState.AppState>) { }

  ngOnInit(): void {

    this.route.params.pipe(
      map(params => {
        this.activationId = params['id'];
        console.log("mmmmmmmmmm activation id======");
        console.log(params['id']);
        console.log(this.activationId);
        return params['id']; }),
      
    )
    .subscribe(actId => {
      
      this.initForm();
     });
    
  }

  initForm() {
   
    this.newUserVerifyForm = new FormGroup({
      
      userPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      userPasswordConfirm: new FormControl(null, [Validators.required, Validators.minLength(6)])
      
    },{ 
      validators: [MatchPasswordValidator('userPassword', 'userPasswordConfirm')] 
    });

    
  }

  get f(){
    return this.newUserVerifyForm.controls;
  }
  
  setNewPassword(){
   

    let newActivation : MmsUserActivationDTO = new MmsUserActivationDTO(
      this.activationId,
      this.newUserVerifyForm.value.userPassword,
      
      );

    this.store.dispatch(MmsUserActions.updateUserActivation({payload: newActivation}));

    this.initForm();

    this.router.navigate(['/auth']);

  }

}
