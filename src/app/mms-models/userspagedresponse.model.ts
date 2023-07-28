import { User } from "./user.model";

export class MmsUsersResponse {
    constructor(public content: User[] ,
    public pageNo: number,
    public pageSize: number,
    public totalElements: number,
    public totalPages: number,
    public last: boolean ){}
}