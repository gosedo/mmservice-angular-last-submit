import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTaskListComponent } from './tech-task-list.component';

describe('TechTaskListComponent', () => {
  let component: TechTaskListComponent;
  let fixture: ComponentFixture<TechTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
