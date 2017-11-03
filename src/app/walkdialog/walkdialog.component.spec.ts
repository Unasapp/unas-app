import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkdialogComponent } from './walkdialog.component';

describe('WalkdialogComponent', () => {
  let component: WalkdialogComponent;
  let fixture: ComponentFixture<WalkdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalkdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
