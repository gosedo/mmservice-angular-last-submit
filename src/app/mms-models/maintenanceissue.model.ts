import { IssueStatus } from "./issuestatus.model";
import { IssueType } from "./issuetype.model";
import { Post } from "./post.model";
import { Tenant } from "./tenant.model";

export class MaintenanceIssue{

	constructor(
		public issueId : number,
		public issueType : IssueType,
		public issueDescription: string ,
		public issueStatus : IssueStatus ,
		public requestedBy: Tenant ,
		public createdOnDate: Date ,
		public completedOnDate: Date ){}
}