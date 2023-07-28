export class IssueDetailViewModel{
    constructor(
    public issueId:number,
    public issueType: string,
    public unitCode: string,
    public dateRequested: Date,
    public requestedByUser: string,
    public issueStatus:string,
    public completedOn: Date,
    public issueDescr: string){}
}