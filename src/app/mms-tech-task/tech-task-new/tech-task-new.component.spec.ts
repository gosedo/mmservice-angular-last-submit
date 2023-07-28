import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTaskNewComponent } from './tech-task-new.component';

describe('TechTaskNewComponent', () => {
  let component: TechTaskNewComponent;
  let fixture: ComponentFixture<TechTaskNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechTaskNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTaskNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
