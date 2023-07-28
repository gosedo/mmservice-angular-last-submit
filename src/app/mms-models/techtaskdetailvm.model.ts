export class TechTaskDetailViewModel{
    constructor(
    public issueType: string,
    public unitCode: string,
    public techTaskId: number,
    public taskCreadtedOn: Date,
    public techTeamAssigned: string,
    public techTaskStatus:string,
    public techTaskCompletedOn: Date,
    public techTaskDescr: string){}
}

               