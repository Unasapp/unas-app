import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustshistorydialogComponent } from './custshistorydialog.component';

describe('CustshistorydialogComponent', () => {
  let component: CustshistorydialogComponent;
  let fixture: ComponentFixture<CustshistorydialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustshistorydialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustshistorydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
