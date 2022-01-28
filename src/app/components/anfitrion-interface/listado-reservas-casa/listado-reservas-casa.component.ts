import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaModel } from 'src/app/models/reserva-model';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-listado-reservas-casa',
  templateUrl: './listado-reservas-casa.component.html',
  styleUrls: ['./listado-reservas-casa.component.css']
})
export class ListadoReservasCasaComponent implements OnInit {

  constructor(private aRoute:ActivatedRoute, private reservaService:ReservasService) { }

  idCasa:string = this.aRoute.snapshot.params.id;
  reservas: ReservaModel[] = [];

  ngOnInit(): void {

    this.reservaService.buscarReservasPorIdCasa(this.idCasa).subscribe(data =>{
      this.reservas = data;
    })


  }

}
