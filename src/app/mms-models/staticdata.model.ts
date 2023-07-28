import { IssueStatus } from "./issuestatus.model";
import { IssueType } from "./issuetype.model";
import { MmsUnit } from "./mmsunit.model";
import { TechTaskStatus } from "./techtaskstatus.model";
import { TechTeam } from "./techteam.model";
import { UsrRoleType } from "./userrole.model";
import { UserStatus } from "./userstatus.model";

export interface StaticData{
    issueTypes: IssueType[];
    issueStatuses: IssueStatus[];
    mmsProperyUnits: MmsUnit[],
    mmsTechTeams: TechTeam[],
    mmsTaskStatuses: TechTaskStatus[],
    mmsUserStatuses: UserStatus[],
    mmsUserTypes: UsrRoleType[]
  }


  // private List<MmsIssueTypeDTO> issueTypes;
	// private List<MmsIssueStatusDTO> issueStatuses;
	// private List<MmsUnitDTO> mmsProperyUnits;
	// private List<MmsTechTeamDTO> mmsTechTeams;
	// private List<MmsTechTaskStatusDTO> mmsTaskStatuses;