import { Component, Input, OnInit } from '@angular/core';
import { MaintenanceIssue } from 'src/app/mms-models/maintenanceissue.model';

@Component({
  selector: 'app-issue-list-item',
  templateUrl: './issue-list-item.component.html',
  styleUrls: ['./issue-list-item.component.css']
})
export class IssueListItemComponent implements OnInit {

  @Input() mmsissue: MaintenanceIssue;
  @Input() index: number;

    issueType: string;
    unitCode: string;
    dateRequested: Date;
    requestedByUser: string;
    issueStatus:string;
    completedOn: Date;
    issueDescr: string;

  constructor() { }

  ngOnInit(): void {

    this.setDetailViewModel(this.mmsissue);

  }

  setDetailViewModel(issue: MaintenanceIssue){
    this.issueType = issue.issueType.issueTypeCode;
    this.unitCode = issue.requestedBy.tenantUnit.unitCode;
    this.dateRequested = issue.createdOnDate;
    this.requestedByUser = issue.requestedBy.tenantInfo.userFirstname;
    this.issueStatus = issue.issueStatus.issueStatusCode;
    this.completedOn = issue.completedOnDate;
    this.issueDescr = issue.issueDescription;
  }

}
