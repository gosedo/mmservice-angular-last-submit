import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAppState from '../../store/state/state-model';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/mms-models/user.model';

@Component({
  selector: 'app-mms-user-detail',
  templateUrl: './mms-user-detail.component.html',
  styleUrls: ['./mms-user-detail.component.css']
})
export class MmsUserDetailComponent implements OnInit {
  routeScubsription: any;
  userId: number;
  mmsUser: any;
  authSubscription: any;
  userIdVM: number;
  userEmailVM: string;
  userFirstnameVM: string;
  userStatusVM: string;
  userRolesVM: string;
  isVerifiedVM: string;
  userLastnameVM: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppState.AppState>) { }

  ngOnInit(): void {

    this.routeScubsription =  this.route.params.pipe(
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
    .subscribe(userOb => {
      this.mmsUser = userOb;
      console.log("From Detail ==========");
      console.log(this.mmsUser);
      this.setDetailViewModel(userOb);
              
    });

 

  }

  ngOnDestroy() {
    this.routeScubsription.unsubscribe();
  }

  onEditUser() {
    this.router.navigate(['user/'+this.userId+'/edit'], );

  }

  onBackToUsersList(){
    this.router.navigate(['/user']);
  }

  setDetailViewModel(user: User){
    this.userIdVM = user.userId;
    this.userEmailVM = user.userEmail;
    this.userFirstnameVM = user.userFirstname;
    this.userLastnameVM = user.userLastname;
    this.userStatusVM = user.userStatus.userStatusDescr;
    this.userRolesVM = user.userRoles[0].usrRoleDescr;
    this.isVerifiedVM = user.isVerified;
  }


}
