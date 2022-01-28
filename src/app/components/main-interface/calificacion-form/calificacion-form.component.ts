import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewCalificacionModel } from 'src/app/models/newCalificacion-model';
import { CalificacionService } from 'src/app/services/calificacion.service';

@Component({
  selector: 'app-calificacion-form',
  templateUrl: './calificacion-form.component.html',
  styleUrls: ['./calificacion-form.component.css']
})
export class CalificacionFormComponent implements OnInit {

  constructor(private calificacionService:CalificacionService, private aRoute:ActivatedRoute, private fb:FormBuilder, private router:Router) { }

  idReserva:string = this.aRoute.snapshot.params.id;

  calificaciones:NewCalificacionModel[] = []

  calificacionPrueba = this.calificaciones[0];


  calificacionACrear:NewCalificacionModel = {};

  calificacionForm = this.fb.group({
    puntaje: ['', Validators.required],
    comentario: ['', Validators.required]
  })


  ngOnInit(): void {
    this.calificacionService.buscarPorIdReserva(this.idReserva).subscribe(data =>{
      this.calificaciones = data;
      this.calificacionACrear.idCalificacion = data[0].idCalificacion;
    });

    if(this.calificaciones.length === 0){
      this.calificacionACrear.idCalificacion = undefined;
      this.calificacionPrueba = {
        comentarioEstadia:'',
        comentarioViajero:''
      }
    }
  }


  crearCalificacion(e:Event){
    e.preventDefault();

    this.calificacionACrear.idDisp = this.idReserva;

    if(this.router.url.includes("Viajero")){

      this.calificacionACrear.comentarioEstadia = this.calificacionForm.get('comentario')?.value;
      this.calificacionACrear.puntajeEstadia = this.calificacionForm.get('puntaje')?.value;

      this.calificacionACrear.comentarioViajero = this.calificaciones[0].comentarioViajero
      this.calificacionACrear.puntajeViajero = this.calificaciones[0].puntajeViajero;
      
    }else if(this.router.url.includes("Anfitrion")){

      this.calificacionACrear.comentarioViajero = this.calificacionForm.get('comentario')?.value;
      this.calificacionACrear.puntajeViajero = this.calificacionForm.get('puntaje')?.value;

      this.calificacionACrear.comentarioEstadia = this.calificaciones[0].comentarioEstadia
      this.calificacionACrear.puntajeEstadia = this.calificaciones[0].puntajeEstadia;

    }

    this.calificacionService.crearCalificacion(this.calificacionACrear).subscribe(data =>{
      alert('Calificación hecha correctamente, serás redireccionado al menú principal')
      this.router.navigate(['dashboard'])
    }, error =>{
      console.log(error);
      alert('Hubo un fallo en la calificación, por favor intente de nuevo')
    })
    

  }

}
