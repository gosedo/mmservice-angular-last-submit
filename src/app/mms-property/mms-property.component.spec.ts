import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsPropertyComponent } from './mms-property.component';

describe('MmsPropertyComponent', () => {
  let component: MmsPropertyComponent;
  let fixture: ComponentFixture<MmsPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmsPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
