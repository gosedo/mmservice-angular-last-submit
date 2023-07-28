import { PropertyManagement } from "./propertymanagement.model";

export class MmsProperty{

    constructor(
        public propertyId: number,
        public proCode: string ,
        public proName: string ,
        public proAddrLine1: string,
        public proAddrLine2: string,
        public proAddrLine3: string,
        public proCity: string,
        public proState: string,
        public proZipcode5: string,
        public proZipcodeExt: string,
        public proPhone: string,
        public proEmail: string,
        public proFax: string,
        public contact: string,
        public proManagement: PropertyManagement ){}

}