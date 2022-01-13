import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { mainApi } from '../interceptors/prod.interceptor';
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
}
