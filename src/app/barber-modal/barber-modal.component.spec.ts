import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberModalComponent } from './barber-modal.component';

describe('BarberModalComponent', () => {
  let component: BarberModalComponent;
  let fixture: ComponentFixture<BarberModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarberModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarberModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
