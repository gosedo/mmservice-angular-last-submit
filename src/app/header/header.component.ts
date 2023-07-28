import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as IssuesActions from '../store/actions/mmsissues.actions';
import * as AuthActions from '../store/actions/auth.actions';
import * as fromStates from '../store/state/state-model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  navbarOpen = false;
  userFullName: string;
  isUserManageAllowed: boolean = false;

  constructor(private authService: AuthService,
             private store: Store<fromStates.AppState>) { }
 

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.authInfo))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        this.isUserManageAllowed = !!user && user.userRoleIds.includes(3) ? true : false;
        this.userFullName = !!user ?  user.userFirstName.trim() + " " + user.userLastName.trim(): "";
        console.log("From header init checking user authentication and userFullName");
        
        console.log(user);
        console.log(!user);
        console.log(!!user);
      });

  }
  

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  onLogout() {
    this.store.dispatch(AuthActions.Logout());
  }

  

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
