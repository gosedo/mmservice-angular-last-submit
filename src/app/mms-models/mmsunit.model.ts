import { MmsProperty } from "./mmsproperty.model";

export class MmsUnit{

    constructor(
        public unitId: number,
        public unitCode: string,
        public unitType: string,
        public unitName: string,
        public unitAddrLine1: string ,
        public unitAddrLine2: string ,
        public unitAddrLine3: string ,
        public unitCity: string ,
        public unitState: string ,
        public unitZipcode5: string ,
        public unitZipcodeExt: string ,
        public unitBelongToProp: MmsProperty){} 
}