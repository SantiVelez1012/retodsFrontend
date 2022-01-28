import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCasasPropiedadComponent } from './listado-casas-propiedad.component';

describe('ListadoCasasPropiedadComponent', () => {
  let component: ListadoCasasPropiedadComponent;
  let fixture: ComponentFixture<ListadoCasasPropiedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCasasPropiedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCasasPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
