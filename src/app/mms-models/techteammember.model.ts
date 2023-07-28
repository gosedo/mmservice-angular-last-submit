import { TechTeam } from "./techteam.model";
import { User } from "./user.model";

export class MmsTechTeamMember {
	
    constructor(
        public teamMemberId: number,
        public memberInfo: User,
        public memberOf : TechTeam [],
        public isLead: string 
    ){}
	
}