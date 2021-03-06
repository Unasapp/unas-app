import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModelComponent } from './login-model.component';

describe('LoginModelComponent', () => {
  let component: LoginModelComponent;
  let fixture: ComponentFixture<LoginModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
