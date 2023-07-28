import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsIssuesComponent } from './mms-issues.component';

describe('MmsIssuesComponent', () => {
  let component: MmsIssuesComponent;
  let fixture: ComponentFixture<MmsIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmsIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmsIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
