    export class IssuesPageInfo{
        constructor(
            public pageNo: number,
            public pageSize: number,
            public totalElements: number,
            public totalPages: number,
            public last: boolean 
        ){}
    }
   