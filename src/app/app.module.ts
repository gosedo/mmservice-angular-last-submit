import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { TenantComponent } from './tenant/tenant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './Shared/loading-spinner/loading-spinner.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MmsUnitComponent } from './mms-unit/mms-unit.component';
import { MmsUserComponent } from './mms-user/mms-user.component';
import { MmsPropertyComponent } from './mms-property/mms-property.component';
import { MmsPropertyMgmtComponent } from './mms-property-mgmt/mms-property-mgmt.component';
import { MmsIssuesComponent } from './mms-issues/mms-issues.component';
import { IssueListComponent } from './mms-issues/issue-list/issue-list.component';
import { IssueDetailComponent } from './mms-issues/issue-detail/issue-detail.component';
import { IssueNewComponent } from './mms-issues/issue-new/issue-new.component';
import { IssueEditComponent } from './mms-issues/issue-edit/issue-edit.component';
import { IssueListItemComponent } from './mms-issues/issue-list/issue-list-item/issue-list-item.component';
import { StoreModule } from '@ngrx/store';
import * as appReducers from '../app/store/reducers/app.reducer'
import { EffectsModule } from '@ngrx/effects';
import { IssueEffects } from './store/effects/mmsissues.effects';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './Shared/alert/alert.component';
import { PlaceholderDirective } from './Shared/placeholder/placeholder.directive';
import { AuthEffects } from './store/effects/auth.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StaticDataEffects } from './store/effects/staticdata.effects';
import { SidebarDirective } from './Shared/sidebar.directive';
import { MmsTechTaskComponent } from './mms-tech-task/mms-tech-task.component';
import { TechTaskNewComponent } from './mms-tech-task/tech-task-new/tech-task-new.component';
import { TechTaskListComponent } from './mms-tech-task/tech-task-list/tech-task-list.component';
import { TechTaskEditComponent } from './mms-tech-task/tech-task-edit/tech-task-edit.component';
import { TechTaskDetailComponent } from './mms-tech-task/tech-task-detail/tech-task-detail.component';
import { TechTaskEffects } from './store/effects/mmstechtask.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MmsUserNewComponent } from './mms-user/mms-user-new/mms-user-new.component';
import { MmsUserListComponent } from './mms-user/mms-user-list/mms-user-list.component';
import { MmsUserEditComponent } from './mms-user/mms-user-edit/mms-user-edit.component';
import { MmsUserDetailComponent } from './mms-user/mms-user-detail/mms-user-detail.component';
import { MmsUserEffects } from './store/effects/mmsuser.effects';
import { MmsUserVerifyComponent } from './mms-user/mms-user-verify/mms-user-verify.component';
import { DropdownDirective } from './Shared/dropdown.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    TenantComponent,
    LoadingSpinnerComponent,
    MmsUnitComponent,
    MmsUserComponent,
    MmsPropertyComponent,
    MmsPropertyMgmtComponent,
    MmsIssuesComponent,
    IssueListComponent,
    IssueDetailComponent,
    IssueNewComponent,
    IssueEditComponent,
    IssueListItemComponent,
    AlertComponent,
    PlaceholderDirective,
    SidebarDirective,
    MmsTechTaskComponent,
    TechTaskNewComponent,
    TechTaskListComponent,
    TechTaskEditComponent,
    TechTaskDetailComponent,
    MmsUserNewComponent,
    MmsUserListComponent,
    MmsUserEditComponent,
    MmsUserDetailComponent,
    MmsUserVerifyComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers.appReducer),
    EffectsModule.forRoot([IssueEffects, AuthEffects, StaticDataEffects, TechTaskEffects,MmsUserEffects]),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
