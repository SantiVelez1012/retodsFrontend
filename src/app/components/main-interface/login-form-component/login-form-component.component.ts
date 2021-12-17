import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login-model';
import { AuthValidationService } from 'src/app/services/auth-validation.service';

@Component({
  selector: 'app-login-form-component',
  templateUrl: './login-form-component.component.html',
  styleUrls: ['./login-form-component.component.css']
})
export class LoginFormComponentComponent implements OnInit {

  constructor(private fb:FormBuilder, private authValidationService:AuthValidationService, private router:Router) { }

  userLogged!:LoginModel;

  loginForm = this.fb.group({
    nombreUsuario: ['', Validators.required],
    password:['', Validators.required]
  })

  ngOnInit(): void {
  }

  loguearUser(){
    this.userLogged = this.loginForm.value;
    console.log(this.userLogged);
    this.authValidationService.validateLogin(this.userLogged) ? this.loginExitoso():this.loginFallido();
  }

  loginExitoso(){
    alert('Login exitoso, será redireccionado al menú principal');
    this.router.navigate(['dashboard']);
  }

  loginFallido(){
    alert('Inicio de sesion fallido, El nombre de usuario o la contraseña no es correcto...');
  }

}
