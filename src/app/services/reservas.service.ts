import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { mainApi } from '../interceptors/prod.interceptor';
import { ReservaModel } from '../models/reserva-model';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {


  private headers ={ headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'})
  }

  private urlReserva = environment.reservaUrl;

  constructor(private http:HttpClient) { }


  crearReserva(reserva: ReservaModel){
    return this.http.post<ReservaModel>(`${this.urlReserva}/crear`, reserva, {context:mainApi()});
  }

  buscarReservasPorIdCasa(idCasa:string){
    return this.http.get<ReservaModel[]>(`${this.urlReserva}/busquedac/${idCasa}`, {context:mainApi()});
  }

  buscarReservasPorUsuarioLogueado(){
    return this.http.get<ReservaModel[]>(`${this.urlReserva}/busquedau`, {context:mainApi()});
  }

}
