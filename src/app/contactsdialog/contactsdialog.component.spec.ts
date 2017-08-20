import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsdialogComponent } from './contactsdialog.component';

describe('ContactsdialogComponent', () => {
  let component: ContactsdialogComponent;
  let fixture: ComponentFixture<ContactsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
