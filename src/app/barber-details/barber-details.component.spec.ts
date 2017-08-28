import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberDetailsComponent } from './barber-details.component';

describe('BarberDetailsComponent', () => {
  let component: BarberDetailsComponent;
  let fixture: ComponentFixture<BarberDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarberDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
