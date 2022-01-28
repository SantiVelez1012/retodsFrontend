import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasaModel } from 'src/app/models/casa-model';
import { NewCalificacionModel } from 'src/app/models/newCalificacion-model';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit {

  constructor(private aRoute:ActivatedRoute, private casaService:HouseService, private calificacionService:CalificacionService) { }

  idCasa:string = this.aRoute.snapshot.params.id;
  casa!:CasaModel;
  
  calificaciones:NewCalificacionModel[] = [];
  puntajePromedio:number = 0;
  accPuntaje:number = 0;
  contadorValidas:number = 0;

  ngOnInit(): void {
    this.casaService.getHouseById(this.idCasa).subscribe(data=>{
      this.casa = data;
    },err =>{
      console.log(err);
    })


    this.calificacionService.buscarPorIdCasa(this.idCasa).subscribe(data =>{
      this.calificaciones = data;

      this.calificaciones.forEach((valor, indice, array)=>{
        
        this.accPuntaje += this.calificaciones[indice].puntajeEstadia || 0;
        if(this.calificaciones[indice].puntajeEstadia != null && this.calificaciones[indice].puntajeEstadia != undefined){
          this.contadorValidas++
        }
      })

      this.puntajePromedio = this.accPuntaje / this.contadorValidas;
    }, error =>{
      console.log(error);
    })    
  }

}
