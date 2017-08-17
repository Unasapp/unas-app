import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberComponent } from './barber.component';

describe('BarberComponent', () => {
  let component: BarberComponent;
  let fixture: ComponentFixture<BarberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
