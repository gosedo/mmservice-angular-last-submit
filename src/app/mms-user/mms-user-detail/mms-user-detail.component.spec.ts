import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsUserDetailComponent } from './mms-user-detail.component';

describe('MmsUserDetailComponent', () => {
  let component: MmsUserDetailComponent;
  let fixture: ComponentFixture<MmsUserDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmsUserDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmsUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
