import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsUserEditComponent } from './mms-user-edit.component';

describe('MmsUserEditComponent', () => {
  let component: MmsUserEditComponent;
  let fixture: ComponentFixture<MmsUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmsUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmsUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
