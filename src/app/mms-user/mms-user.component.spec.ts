import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsUserComponent } from './mms-user.component';

describe('MmsUserComponent', () => {
  let component: MmsUserComponent;
  let fixture: ComponentFixture<MmsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
