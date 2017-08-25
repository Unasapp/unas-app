import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApptdialogComponent } from './apptdialog.component';

describe('ApptdialogComponent', () => {
  let component: ApptdialogComponent;
  let fixture: ComponentFixture<ApptdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApptdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApptdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
