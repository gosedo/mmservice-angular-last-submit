import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsUserNewComponent } from './mms-user-new.component';

describe('MmsUserNewComponent', () => {
  let component: MmsUserNewComponent;
  let fixture: ComponentFixture<MmsUserNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmsUserNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmsUserNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
