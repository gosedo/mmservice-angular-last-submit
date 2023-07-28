import { MaintenanceIssue } from "./maintenanceissue.model";

export class MmsIssueResponse {
    constructor(public content: MaintenanceIssue[] ,
    public pageNo: number,
    public pageSize: number,
    public totalElements: number,
    public totalPages: number,
    public last: boolean ){}
}