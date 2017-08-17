import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllbarbersComponent } from './allbarbers.component';

describe('AllbarbersComponent', () => {
  let component: AllbarbersComponent;
  let fixture: ComponentFixture<AllbarbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllbarbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllbarbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
