import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsUnitComponent } from './mms-unit.component';

describe('MmsUnitComponent', () => {
  let component: MmsUnitComponent;
  let fixture: ComponentFixture<MmsUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmsUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmsUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
