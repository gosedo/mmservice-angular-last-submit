import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MaintenanceIssue } from "./mms-models/maintenanceissue.model";
import { Subject } from "rxjs";
import { IssueDetailViewModel } from "./mms-models/issuedetailvm.model";



@Injectable({
    providedIn: 'root'
  })
export class MmsSpringBootService {

  
addedIssue = new Subject<MaintenanceIssue>();
// addedPrize = new Subject<TeamMember>();
// addedTeam = new Subject<Team>();

    constructor(private http: HttpClient) { 

    }

    getAllMaintenanceIssues(){
    
    return this.http.get<MaintenanceIssue[]>(
        'http://localhost:8080/api/issue/mmsissue-list'
        );
    }

    
}