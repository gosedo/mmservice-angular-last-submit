import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TenantComponent } from './tenant/tenant.component';
import { MmsIssuesComponent } from './mms-issues/mms-issues.component';
import { IssueNewComponent } from './mms-issues/issue-new/issue-new.component';
import { IssueDetailComponent } from './mms-issues/issue-detail/issue-detail.component';
import { MmsIssuesResolverService } from './mms-issues/mms-issues-resolver.service';
import { IssueEditComponent } from './mms-issues/issue-edit/issue-edit.component';
import { TechTaskNewComponent } from './mms-tech-task/tech-task-new/tech-task-new.component';
import { TechTaskListComponent } from './mms-tech-task/tech-task-list/tech-task-list.component';
import { TechTaskDetailComponent } from './mms-tech-task/tech-task-detail/tech-task-detail.component';
import { TechTaskEditComponent } from './mms-tech-task/tech-task-edit/tech-task-edit.component';
import { AuthGuard } from './auth/auth.guard';
import { MmsUserComponent } from './mms-user/mms-user.component';
import { MmsUserNewComponent } from './mms-user/mms-user-new/mms-user-new.component';
import { MmsUserVerifyComponent } from './mms-user/mms-user-verify/mms-user-verify.component';
import { MmsUserDetailComponent } from './mms-user/mms-user-detail/mms-user-detail.component';
import { MmsUserEditComponent } from './mms-user/mms-user-edit/mms-user-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth',pathMatch: 'full'},
  { path: 'auth', component: AuthComponent },

  { path: 'user/new', component: MmsUserNewComponent },
  { path: 'user/:id', component: MmsUserDetailComponent },
  { path: 'user/:id/edit', component: MmsUserEditComponent },
  
  { path: 'user', component: MmsUserComponent },
  { path: 'newuser/activation/:id', component: MmsUserVerifyComponent },
  { path: 'tenant', component: TenantComponent },

  { path: 'task/:issueId/new', component: TechTaskNewComponent,canActivate: [AuthGuard], },
  { path: 'task/:id/edit', component: TechTaskEditComponent, canActivate: [AuthGuard], },
  { path: 'task/:id', component: TechTaskDetailComponent, canActivate: [AuthGuard], },

  { path: 'issue/new', component: IssueNewComponent, canActivate: [AuthGuard], },
  { path: 'issue/:id/edit', component: IssueEditComponent, canActivate: [AuthGuard], },
  { path: 'issue/:id', component: IssueDetailComponent, canActivate: [AuthGuard],

   children: [
    //{ path: 'task/list', component: TechTaskListComponent },
    { path: 'task/:id/list', component: TechTaskListComponent },
  ] 
  
  },
  
  { path: 'issue', component: MmsIssuesComponent, resolve: [MmsIssuesResolverService],canActivate: [AuthGuard], 
    children: [
      { path: '', component: IssueNewComponent },
      { path: ':id', component: IssueDetailComponent },
      { path: ':id/edit', component: IssueEditComponent },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
