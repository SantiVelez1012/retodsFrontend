import { Component, OnInit } from '@angular/core';
import { Nuevo_usuario } from 'src/app/models/nuevo_usuario-model';
import { AuthService } from 'src/app/services/auth-service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form-component',
  templateUrl: './register-form-component.component.html',
  styleUrls: ['./register-form-component.component.css']
})
export class RegisterFormComponentComponent implements OnInit {

  constructor(private authService: AuthService, private fb:FormBuilder) { }

  usuarioRegistro!:Nuevo_usuario;
  roles = ["Anfitrion", "Visitante"];

  registerForm = this.fb.group({
    nombreUsuario: ['', Validators.required],
    password:['', Validators.required],
    nombreCompleto:['', Validators.required],
    ciudad: ['', Validators.required],
    pais:['', Validators.required] 
  })

  /* 
  CAMPOS PARA EL FORMULARIO DE REGISTRO
    Usuario
    Contraseña
    Nombre Completo
    Ciudad
    País
    Rol (Anfitrión o Viajero)
  */ 

  ngOnInit(): void {
    console.log("xd");
  }

  registrarUser(){
    this.usuarioRegistro = this.registerForm.value;
    this.usuarioRegistro.roles = this.roles;


    return console.log(this.usuarioRegistro);
    //return this.authService.registroUsuario(this.usuarioRegistro);
  }

}
