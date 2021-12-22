import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,
HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { JwtModel } from '../models/jwt-model';
import { map } from 'rxjs/operators';

const AUTHORIZATION = 'Authorization';

@Injectable()
export class ProdInterceptor implements HttpInterceptor{
    

    constructor( private authService: AuthService, private tokenService:TokenService){ }

    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
        console.log("paso por el interceptor http");
        if(!this.tokenService.isLogged()){ 
            return next.handle(req);
        }
        let authRequest = req;

        console.log(req.url);

        const token = this.tokenService.getToken();

        authRequest = ProdInterceptor.addToken(req, token);
        

        //@ts-ignore
        return next.handle(authRequest).pipe(catchError((error:HttpErrorResponse) =>{
            
            if(error.status == 401){
            const jwtModel:JwtModel  = {
                token:this.tokenService.getToken()
            };

            return this.authService.refrescarSesion(jwtModel).pipe(map((data:any) =>{
                this.tokenService.setToken(data.token);
                authRequest = authRequest = ProdInterceptor.addToken(req, data.token);
                return next.handle(authRequest);
             }));

         }else{
             return throwError(error);
          }
        }));
     }

    private static addToken(req:HttpRequest<any>, token:string|null):HttpRequest<any>{ 
       return req.clone({headers:req.headers.set(AUTHORIZATION, 'Bearer' + token) });  
    }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS,
     useClass:ProdInterceptor, multi:true}];