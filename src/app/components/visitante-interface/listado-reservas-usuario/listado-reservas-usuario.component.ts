import { Component, OnInit } from '@angular/core';
import { ReservaModel } from 'src/app/models/reserva-model';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-listado-reservas-usuario',
  templateUrl: './listado-reservas-usuario.component.html',
  styleUrls: ['./listado-reservas-usuario.component.css']
})
export class ListadoReservasUsuarioComponent implements OnInit {

  constructor(private reservaService:ReservasService) { }

  reservas:ReservaModel[] = [];

  ngOnInit(): void {

    this.reservaService.buscarReservasPorUsuarioLogueado().subscribe(data =>{
      this.reservas = data;
      
    })

  }

}
