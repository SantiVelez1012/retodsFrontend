import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { mainApi } from '../interceptors/prod.interceptor';
import { BusquedaModel } from '../models/busqueda-model';
import { CasaModel } from '../models/casa-model';
import { NewCasaModel } from '../models/newcasa-model';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private headers ={ headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'})
  }

  private urlHouse = environment.houseUrl;

  constructor(private http:HttpClient) { }


  guardarCasa(casa: NewCasaModel){
    return this.http.post<NewCasaModel>(`${this.urlHouse}/guardarcasa`, casa, {context:mainApi()});
  }

  obtenerTodas(){
    return this.http.get<CasaModel[]>(`${this.urlHouse}/busqueda/todas`, {context:mainApi()});
  }

  getHouseById(id:string){
    return this.http.get<CasaModel>(`${this.urlHouse}/busqueda/${id}`, {context:mainApi()});
  }

  getHousesByCriterio(criterio:BusquedaModel){
    return this.http.post<CasaModel[]>(`${this.urlHouse}/busqueda/criterio`, criterio, {context:mainApi()});
  }

  getHousesByLoggedUser(){
    return this.http.get<CasaModel[]>(`${this.urlHouse}/busqueda/casasP`,{context:mainApi()});
  }

}
