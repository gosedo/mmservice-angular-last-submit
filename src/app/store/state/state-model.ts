
import { MaintenanceIssue } from 'src/app/mms-models/maintenanceissue.model';
import { MmsProperty } from 'src/app/mms-models/mmsproperty.model';
import { MmsUnit } from 'src/app/mms-models/mmsunit.model';

import * as fromAuth from '../reducers/auth.reducer';
import * as fromIssues from '../reducers/mmsissues.reducers';
import * as fromStaticData from '../reducers/staticdata.reducers';
import * as fromTechTask from '../reducers/mmstechtask.reducers';
import * as fromIssuePagInfo from '../reducers/issuepageinfo.reducers';
import * as fromMmsUsers from '../reducers/mmsuser.reducers';
import * as fromMmsUsersPageInfo from '../reducers/userspageinfo.reducers';




export interface AppState{
  // propMgmtList:PropertyManagement[];
  // selectedCountry:number;
  // propertiesList:MmsProperty[];
  // unitsList:MmsUnit[];
  staticData: fromStaticData.State;
  auth: fromAuth.State;
  issues: fromIssues.State;
  techtasks: fromTechTask.State;
  issuesPageInfo: fromIssuePagInfo.State;
  mmsusersinstore: fromMmsUsers.State;
  usersPageInfo: fromMmsUsersPageInfo.State;
}

// export const initialState: AppState = {
//   propMgmtList: [], 
//   selectedCountry: -1,
//   propertiesList: [],
//   unitsList: [],
//   issues: []
// }