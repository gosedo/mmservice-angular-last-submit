import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsUserVerifyComponent } from './mms-user-verify.component';

describe('MmsUserVerifyComponent', () => {
  let component: MmsUserVerifyComponent;
  let fixture: ComponentFixture<MmsUserVerifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmsUserVerifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmsUserVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
