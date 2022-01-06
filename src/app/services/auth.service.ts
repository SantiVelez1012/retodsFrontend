import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Nuevo_usuario } from "../models/nuevo_usuario-model";
import { LoginModel } from "../models/login-model";
import { JwtModel } from "../models/jwt-model";
import { TokenService } from "./token.service";
import { map } from "rxjs/operators";

@Injectable({
    providedIn:'root'
})
export class AuthService{

    private headers ={ headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'})
    }

    authURL = environment.authUrl;

    constructor(private http:HttpClient, private tokenService:TokenService){}

    public registroUsuario(nuevoUsuario:Nuevo_usuario){
        return this.http.post<any>(`${this.authURL}/NUEVO-USUARIO`, nuevoUsuario);
    }

    public logueoUsuario(loginModel:LoginModel){
        return this.http.post<any>(`${this.authURL}/LOGIN`, loginModel).pipe(map(() =>{
            this.startTokenTimer();
        }));
    }

    public refrescarSesion(jsonWebToken:JwtModel){
        return this.http.post<JwtModel>(`${this.authURL}/REFRESH_TOKEN`, jsonWebToken).pipe(map(() =>{
            this.startTokenTimer();
        }));;
    }

    
    //@ts-ignore
    private refreshTokenTimeout;

    private startTokenTimer(){

        const expiracion = new Date(3600000);

        const token:JwtModel ={
            token:this.tokenService.getToken()
        }

        const timeout = expiracion.getTime() - Date.now() - (60 * 1000);
        
        this.refreshTokenTimeout = setTimeout(()=> this.refrescarSesion(token).subscribe(), timeout);

    }

    private stopRefreshTokenTimer(){
        clearTimeout(this.refreshTokenTimeout());
    }

}

