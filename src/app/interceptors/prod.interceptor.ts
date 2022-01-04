import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,
HttpErrorResponse, HTTP_INTERCEPTORS, HttpContext, HttpContextToken } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { JwtModel } from '../models/jwt-model';
import { map } from 'rxjs/operators';

const MAIN_API = new HttpContextToken<boolean>( ()=> false);
const AUTHORIZATION = 'Authorization';

export function mainApi(){
    return new HttpContext().set(MAIN_API, true);
}

@Injectable()
export class ProdInterceptor implements HttpInterceptor{
    

    constructor( private authService: AuthService, private tokenService:TokenService){ }

    intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
        console.log("paso por el interceptor http");
        if(!this.tokenService.isLogged() || !req.context.get(MAIN_API)){
            return next.handle(req);
        }

        let authRequest = req;

        console.log(req.url);

        if(authRequest.context.get(MAIN_API)){
            authRequest = this.addToken(req);
        }


        //@ts-ignore
        return next.handle(authRequest).pipe(catchError((error:HttpErrorResponse) =>{

            console.log(error);
            return throwError(error);
            
            /*if(error.status == 401){
            const jwtModel:JwtModel  = {
                token:this.tokenService.getToken()
            };

            return this.authService.refrescarSesion(jwtModel).pipe(map((data:any) =>{
                this.tokenService.setToken(data.token);
                authRequest = this.addToken(authRequest);
                return next.handle(authRequest);
             }));

         }else{
             return throwError(error);
          }*/
        }
        ));
     }

    private addToken(req:HttpRequest<any>):HttpRequest<any>{ 
        const token = this.tokenService.getToken();

        if(token){
            return req.clone({headers:req.headers.set(AUTHORIZATION, 'Bearer' + token) });  
        }

        return req;
       
    }

}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS,
     useClass:ProdInterceptor, multi:true}];