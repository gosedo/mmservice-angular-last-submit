export class MmsUserUpdateDTO {

    constructor(
        public userId: number,
        public userEmail:string,
        public userPassword: string,
        public userFirstname: string,
        public userLastname: string,
        public userPhone: string,
        public userRoles: number[],
        public userStatus: number){

    }
    

}

    
	