export class UsersPageInfo{
    constructor(
        public pageNo: number,
        public pageSize: number,
        public totalElements: number,
        public totalPages: number,
        public last: boolean 
    ){}
}