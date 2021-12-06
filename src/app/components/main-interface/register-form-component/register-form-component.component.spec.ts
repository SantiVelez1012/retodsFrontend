import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponentComponent } from './register-form-component.component';

describe('RegisterFormComponentComponent', () => {
  let component: RegisterFormComponentComponent;
  let fixture: ComponentFixture<RegisterFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
