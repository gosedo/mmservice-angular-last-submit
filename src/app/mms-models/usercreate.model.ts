export class MmsUserCreateDTO{

    constructor(
        public userEmail : string,
        public userPassword : string,
        public userFirstname : string,
        public userLastname:string,
        public userPhone : string,
        public userRoles : number,
        public userTeam: number,
        public userUnit){}
	
		
}