import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoReservasCasaComponent } from './listado-reservas-casa.component';

describe('ListadoReservasCasaComponent', () => {
  let component: ListadoReservasCasaComponent;
  let fixture: ComponentFixture<ListadoReservasCasaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoReservasCasaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoReservasCasaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
