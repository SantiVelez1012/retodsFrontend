import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { mainApi } from '../interceptors/prod.interceptor';
import { NewCalificacionModel } from '../models/newCalificacion-model';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  constructor(private http:HttpClient) { }

  urlCalificaciones = environment.calificacionUrl;

  crearCalificacion(calificacion:NewCalificacionModel){
    return this.http.post<NewCalificacionModel>(`${this.urlCalificaciones}/crear`, calificacion, {context:mainApi()});
  }

  buscarPorIdReserva(id:string){
    return this.http.get<NewCalificacionModel[]>(`${this.urlCalificaciones}/busquedaid/${id}`, {context:mainApi()});
  }

  buscarPorIdCasa(id:string){
    return this.http.get<NewCalificacionModel[]>(`${this.urlCalificaciones}/busquedaidcasa/${id}`, {context:mainApi()});
  }

  buscarPorNombreUsuario(id:string){
    return this.http.get<NewCalificacionModel[]>(`${this.urlCalificaciones}/busquedanombreusuario/${id}`, {context:mainApi()});
  }

}
