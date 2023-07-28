import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MmsPropertyMgmtComponent } from './mms-property-mgmt.component';

describe('MmsPropertyMgmtComponent', () => {
  let component: MmsPropertyMgmtComponent;
  let fixture: ComponentFixture<MmsPropertyMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MmsPropertyMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmsPropertyMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
