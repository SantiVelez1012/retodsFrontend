import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaPickerComponent } from './reserva-picker.component';

describe('ReservaPickerComponent', () => {
  let component: ReservaPickerComponent;
  let fixture: ComponentFixture<ReservaPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
