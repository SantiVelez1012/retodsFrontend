import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { Nuevo_usuario } from '../models/nuevo_usuario-model';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthValidationService {


  constructor(private authService:AuthService, private tokenService:TokenService) { }
  validateExistence(usuario:Nuevo_usuario):boolean{
    
    var errorStatus = 0; 
    new Promise((resolve)=>{
      this.authService.registroUsuario(usuario).subscribe(data =>{
        console.log(data);
      }, err =>{
        errorStatus = err.status;
        console.log(errorStatus);
        resolve(errorStatus);
      });
    });
    return errorStatus === 400 ? false : true;
  }

  validateLogin(usuario:LoginModel){
    var errorStatus = 0; 
    new Promise((resolve)=>{
      this.authService.logueoUsuario(usuario).subscribe(data =>{
        this.tokenService.setToken(data.token);
        console.log(this.tokenService.getToken());
      }, err =>{
        errorStatus = err.status;
        console.log(errorStatus);
        resolve(errorStatus);
      });
    });
    return errorStatus === 401 ? false : true;
  }


}
