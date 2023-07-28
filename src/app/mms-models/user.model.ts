import { UsrRoleType } from "./userrole.model";
import { UserStatus } from "./userstatus.model";

export class User{
    constructor(
        public userId: number ,
        public userEmail: string,
        public userPassword: string,
        public userFirstname: string,
        public userLastname: string,
        public userPhone: string,
        public userRoles: UsrRoleType[],
        public userStatus: UserStatus,
        public isVerified: string
    ){}
}


	