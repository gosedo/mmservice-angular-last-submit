import { MaintenanceIssue } from "./maintenanceissue.model";
import { TechTaskStatus } from "./techtaskstatus.model";
import { TechTeam } from "./techteam.model";
import { User } from "./user.model";

export class TechTask {
		
	constructor(
        public techTaskId: number,
        public taskDescr: string,
        public issueTaskFor: MaintenanceIssue,
        public taskStatus: TechTaskStatus,
        public createdOnDate: Date,
        public closedOnDate: Date, 
        public teamAssigned: TechTeam,
        public taskCreatedBy: User,
        public taskUpdatedBy: User
    ){}
	
}
	 