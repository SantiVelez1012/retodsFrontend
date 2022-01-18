import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar-app',
  templateUrl: './navbar-app.component.html',
  styleUrls: ['./navbar-app.component.css']
})
export class NavbarAppComponent implements OnInit {

  

  constructor(private tokenService:TokenService, private router:Router) { }

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

}
