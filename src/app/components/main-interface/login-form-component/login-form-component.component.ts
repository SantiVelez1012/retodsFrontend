import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form-component',
  templateUrl: './login-form-component.component.html',
  styleUrls: ['./login-form-component.component.css']
})
export class LoginFormComponentComponent implements OnInit {

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router) { }

  userLogged!:LoginModel;

  loginForm = this.fb.group({
    nombreUsuario: ['', Validators.required],
    password:['', Validators.required]
  })

  ngOnInit(): void {
  }

  loguearUser(){
    this.userLogged = this.loginForm.value;

    this.authService.logueoUsuario(this.userLogged).subscribe(data =>{
      alert('Logueo exitoso, sera redirigido al menu principal :D');
      this.router.navigate(['dashboard']);
    }, err =>{
      alert('Logueo fallido, revise los datos e intentelo de nuevo, si no tiene una cuenta por favor registrese');
    });

  }

  redirectToRegister(){
    this.router.navigate(['register']);
  }
}
