import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoReservasUsuarioComponent } from './listado-reservas-usuario.component';

describe('ListadoReservasUsuarioComponent', () => {
  let component: ListadoReservasUsuarioComponent;
  let fixture: ComponentFixture<ListadoReservasUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoReservasUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoReservasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
