import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTaskDetailComponent } from './tech-task-detail.component';

describe('TechTaskDetailComponent', () => {
  let component: TechTaskDetailComponent;
  let fixture: ComponentFixture<TechTaskDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechTaskDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
