import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsrRoleType } from '../mms-models/userrole.model';
import * as fromAppState from '../store/state/state-model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mms-user',
  templateUrl: './mms-user.component.html',
  styleUrls: ['./mms-user.component.css']
})
export class MmsUserComponent implements OnInit {

  
  constructor(
    private store: Store<fromAppState.AppState>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    
  }

  onNewUser() {
    
    this.router.navigate(['user/new']);
  }
  
  
}


