import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashoutdialogComponent } from './cashoutdialog.component';

describe('CashoutdialogComponent', () => {
  let component: CashoutdialogComponent;
  let fixture: ComponentFixture<CashoutdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashoutdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashoutdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
