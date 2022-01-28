import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicUserModel } from 'src/app/models/publicInfoUser-model';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar-app',
  templateUrl: './navbar-app.component.html',
  styleUrls: ['./navbar-app.component.css']
})
export class NavbarAppComponent implements OnInit {

  
  currentUser!:PublicUserModel;

  constructor(private tokenService:TokenService, private router:Router, private userService:UsuarioService) { }

  ngOnInit(): void {
  }

  validateLogin():boolean{
    return this.tokenService.isLogged();
  }

  desloguear(){
    this.tokenService.logOut();
  }

  redireccionar(){
    this.router.navigate(['dashboard'])
  }

  redirectProfile(){
    this.userService.obtenerInfoPublicaConToken().subscribe(data =>{
      this.currentUser = data;
      this.router.navigate([`perfilUsuario/${this.currentUser.nombreUsuario}`]);
    })
  }

}
