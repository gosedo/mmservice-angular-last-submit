import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from './auth.service';
import * as fromStates from '../store/state/state-model'

import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { PlaceholderDirective } from '../Shared/placeholder/placeholder.directive';
import * as AuthActions from '../store/actions/auth.actions';
import { AlertComponent } from '../Shared/alert/alert.component';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  private closeSub: Subscription;
  private storeSub: Subscription;
  
  isLoginMode = false;
  isLoading = false;
  error:string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver
            , private authService: AuthService
            , private router: Router
            , private store: Store<fromStates.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch( AuthActions.AutoLogin());
    
    this.storeSub = this.store.select('auth').subscribe(authState => {
      
      this.isLoading = authState.loading;
      this.error = authState.authError;
      
    });

  }

  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

      
      this.store.dispatch(
        AuthActions.LoginStart({ payload: { email: email, password: password }})
      );
    

    form.reset();
  }
 
  

  
  delay(milliseconds : number) {
    return new Promise(resolve => setTimeout( resolve, milliseconds));
  }

  onHandleError() {
    this.store.dispatch( AuthActions.ClearError());
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
  private showErrorAlert(message: string) {
   
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

}
