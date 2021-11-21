import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenService } from "../services/token-service";

@Injectable({
    providedIn:'root'
})

export class ProdGuard{
    rolReal:string | undefined;

    constructor(private tokenService:TokenService, private router:Router) {
    }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot):
       Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
           const rolEsperado = route.data.rolEsperado;

           this.rolReal = this.tokenService.isAnfitrion() ? "anfitrion":"visitante";
           
           if (!this.tokenService.isLogged() || rolEsperado.indexOf(this.rolReal) < 0) {
            this.router.navigate(['/error']);
            return false;
          }
          return true;
       }


}