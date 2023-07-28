import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsUserListComponent } from './mms-user-list.component';

describe('MmsUserListComponent', () => {
  let component: MmsUserListComponent;
  let fixture: ComponentFixture<MmsUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmsUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmsUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
