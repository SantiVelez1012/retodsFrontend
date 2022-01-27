import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewCalificacionModel } from 'src/app/models/newCalificacion-model';
import { CalificacionService } from 'src/app/services/calificacion.service';

@Component({
  selector: 'app-calificacion-form',
  templateUrl: './calificacion-form.component.html',
  styleUrls: ['./calificacion-form.component.css']
})
export class CalificacionFormComponent implements OnInit {

  constructor(private calificacionService:CalificacionService, private aRoute:ActivatedRoute) { }

  idReserva:string = this.aRoute.snapshot.params.id;

  calificaciones:NewCalificacionModel[] = []


  ngOnInit(): void {

    this.calificacionService.buscarPorIdReserva(this.idReserva).subscribe(data =>{
      console.log(data);
      this.calificaciones = data;
    })

  }

}
