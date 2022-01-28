import { HttpContext, HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

const COUNTRY_API = new HttpContextToken<boolean>( ()=> false);
const AUTHORIZATION = 'Authorization';

export function validateCountryApi(){
  return new HttpContext().set(COUNTRY_API, true);
}

@Injectable({
  providedIn: 'root'
})
export class CountriesInterceptorService implements HttpInterceptor {

  constructor(private tokenService:TokenService) { }

  addToken(req:HttpRequest<unknown>){
    const token = this.tokenService.getCountryToken();
    if(token){
      return req.clone({
        headers:req.headers.set(AUTHORIZATION, `Bearer ${token}`)
      });
    }
    return req;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.context.get(COUNTRY_API)){
      req = this.addToken(req);
    }
    return next.handle(req);
  }
}