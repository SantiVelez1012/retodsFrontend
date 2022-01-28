import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewCalificacionModel } from 'src/app/models/newCalificacion-model';
import { PublicUserModel } from 'src/app/models/publicInfoUser-model';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  constructor(private userService:UsuarioService, private aRoute:ActivatedRoute, private calificacionService:CalificacionService) { }

  nombreUsuario:string = this.aRoute.snapshot.params.id;
  user!:PublicUserModel;

  calificaciones:NewCalificacionModel[] = [];
  puntajePromedio:number = 0;
  accPuntaje:number = 0;
  contadorValidas:number = 0;

  ngOnInit(): void {

    this.userService.obtenerInfoPublicaSinToken(this.nombreUsuario).subscribe(data =>{
      this.user = data;
    })


    this.calificacionService.buscarPorNombreUsuario(this.nombreUsuario).subscribe(data =>{
      this.calificaciones = data;

      this.calificaciones.forEach((valor, indice, array)=>{
        
        this.accPuntaje += this.calificaciones[indice].puntajeViajero || 0;
        if(this.calificaciones[indice].puntajeViajero != null && this.calificaciones[indice].puntajeViajero != undefined){
          this.contadorValidas++
        }
      })

      this.puntajePromedio = this.accPuntaje / this.contadorValidas;
    }, error =>{
      console.log(error);
    })  
  }

}
