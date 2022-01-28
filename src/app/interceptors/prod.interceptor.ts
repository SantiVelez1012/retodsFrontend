import { Injectable } from '@angular/core'
import {
    HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,
    HTTP_INTERCEPTORS, HttpContext, HttpContextToken
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

const MAIN_API = new HttpContextToken<boolean>(() => false);
const AUTHORIZATION = 'Authorization';

export function mainApi() {
    return new HttpContext().set(MAIN_API, true);
}

@Injectable()
export class ProdInterceptor implements HttpInterceptor {


    constructor(private authService: AuthService, private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (!this.tokenService.isLogged()) {
            return next.handle(req);
        }
        if (req.context.get(MAIN_API)) {
            req = this.addToken(req);
        }

        return next.handle(req);
    }

    private addToken(req: HttpRequest<any>): HttpRequest<any> {
        const token = this.tokenService.getToken();
        if (token) {
            return req.clone({ headers: req.headers.set(AUTHORIZATION, 'Bearer ' + token) });
        }

        return req;

    }

}

export const interceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useClass: ProdInterceptor, multi: true
}];