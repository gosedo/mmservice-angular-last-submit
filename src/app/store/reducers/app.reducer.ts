import { ActionReducerMap } from '@ngrx/store';
import {AppState} from '../state/state-model';

import * as fromIssue from '../reducers/mmsissues.reducers';
import * as fromAuth from '../reducers/auth.reducer';
import * as fromStaticData from '../reducers/staticdata.reducers';
import * as fromTechTask from '../reducers/mmstechtask.reducers';
import * as fromIssuePageInfo from '../reducers/issuepageinfo.reducers';
import * as fromMmsUsers from '../reducers/mmsuser.reducers';
import * as fromUsersPageInfo from '../reducers/userspageinfo.reducers'


export const appReducer: ActionReducerMap<AppState> = {
    staticData: fromStaticData.staticDataReducers,
    auth: fromAuth.authReducer,
    issues: fromIssue.issueReducers,
    techtasks: fromTechTask.techTaskReducers,
    issuesPageInfo: fromIssuePageInfo.issuePageInfoReducers,
    mmsusersinstore: fromMmsUsers.mmsUsersReducers,
    usersPageInfo: fromUsersPageInfo.userPageInfoReducers
};
  