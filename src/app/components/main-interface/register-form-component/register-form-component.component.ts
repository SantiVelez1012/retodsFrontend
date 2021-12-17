import { Component, OnInit } from '@angular/core';
import { Nuevo_usuario } from 'src/app/models/nuevo_usuario-model';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthValidationService } from 'src/app/services/auth-validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form-component',
  templateUrl: './register-form-component.component.html',
  styleUrls: ['./register-form-component.component.css']
})
export class RegisterFormComponentComponent implements OnInit {

  constructor(private authService: AuthService, private fb:FormBuilder, private authValidationService: AuthValidationService, private router:Router) { }

  usuarioRegistro!:Nuevo_usuario;
  roles = ["Anfitrion", "Viajero"];

  registerForm = this.fb.group({
    nombreUsuario: ['', Validators.required],
    password:['', Validators.required],
    nombreCompleto:['', Validators.required],
    ciudad: ['', Validators.required],
    pais:['', Validators.required] 
  })


  ngOnInit(): void {
    
  }

  registrarUser(){
    this.usuarioRegistro = this.registerForm.value;
    this.usuarioRegistro.roles = this.roles;

    this.authValidationService.validateExistence(this.usuarioRegistro) ? this.registroExitoso() : this.registroFallido();

  }

  registroExitoso(){
    alert('Registro realizado con exito, por favor proceda a loguearse');
    this.router.navigate(['login']);

  }

  registroFallido(){
    alert('Nombre de usuario ya utilizado, por favor elija otro');
  }

}
