import { MaintenanceIssue } from "./maintenanceissue.model";
import { User } from "./user.model";

export class Post{

    constructor(
    public postId: number,
	public postToIssue: MaintenanceIssue,
	public comment: string,
	public createdOn: Date,
	public postedBy:User ){}

}