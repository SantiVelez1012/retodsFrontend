import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

const TOKEN_KEY = "AuthToken";
const COUNTRY_KEY = "CountryToken";

@Injectable({
    providedIn:'root'
})

export class TokenService{
    constructor(private router:Router){}

    public setToken(token:string):void{
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY,token);
    }

    public setCountryToken(token:string):void{
        window.sessionStorage.removeItem(COUNTRY_KEY);
        window.sessionStorage.setItem(COUNTRY_KEY, token);
    }

    public getCountryToken(){
        return window.sessionStorage.getItem(COUNTRY_KEY);
    }


    public getToken(){
        return localStorage.getItem(TOKEN_KEY);
    }

    public isLogged():boolean{
        return !!this.getToken();
    }

    public getUsernameFromToken(){
        if(!this.isLogged()){
            return null;
        }

        const token = this.getToken();
        // @ts-ignore
        const payLoad = token.split('.')[1];
        const payLoadDecode = atob(payLoad);
        const valor = JSON.parse(payLoadDecode);

        return valor.sub;

    }

    public isAnfitrion(){
        if(!this.isLogged()){
            return null;
        }

        const token = this.getToken();

        // @ts-ignore
        const payLoad = token.split('.')[1];
        const payLoadDecode = atob(payLoad);
        const valor = JSON.parse(payLoadDecode);
        const roles = valor.roles;
        return roles.indexOf('ANFITRION') >= 0;
    }

    public logOut(){
        window.localStorage.clear();
        this.router.navigate(['/']);
    }

}