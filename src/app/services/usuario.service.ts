import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { mainApi } from '../interceptors/prod.interceptor';
import { PublicUserModel } from '../models/publicInfoUser-model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  userUrl = environment.userUrl;


  obtenerInfoPublicaSinToken(nombreUsuario:string){
    return this.http.get<PublicUserModel>(`${this.userUrl}/busqueda/${nombreUsuario}`, {context:mainApi()});
  }

  obtenerInfoPublicaConToken(){
    return this.http.get<PublicUserModel>(`${this.userUrl}/busqueda`, {context:mainApi()});
  }

}
