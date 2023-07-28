import { MmsUnit } from "./mmsunit.model";
import { User } from "./user.model";

export class Tenant{

    constructor(
    public tenantId: number,
	public tenantInfo: User,
	public tenantUnit: MmsUnit,
	public isCurrent: boolean,
	public createdOnDate: Date,
	public statusModifiedDate: Date ){}
}