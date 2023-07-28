import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTaskEditComponent } from './tech-task-edit.component';

describe('TechTaskEditComponent', () => {
  let component: TechTaskEditComponent;
  let fixture: ComponentFixture<TechTaskEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechTaskEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
