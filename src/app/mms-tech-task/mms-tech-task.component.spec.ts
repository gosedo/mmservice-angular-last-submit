import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsTechTaskComponent } from './mms-tech-task.component';

describe('MmsTechTaskComponent', () => {
  let component: MmsTechTaskComponent;
  let fixture: ComponentFixture<MmsTechTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmsTechTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmsTechTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
