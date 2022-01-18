import { Component, OnInit } from '@angular/core';
import { Nuevo_usuario } from 'src/app/models/nuevo_usuario-model';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form-component',
  templateUrl: './register-form-component.component.html',
  styleUrls: ['./register-form-component.component.css']
})
export class RegisterFormComponentComponent implements OnInit {

  constructor(private authService: AuthService, private fb:FormBuilder, private router:Router) { }

  usuarioRegistro!:Nuevo_usuario;
  roles = ["Anfitrion", "Viajero"];

  registerForm = this.fb.group({
    nombreUsuario: ['', Validators.required],
    password:['', Validators.required],
    nombreCompleto:['', Validators.required],
    ciudad: ['', Validators.required],
    pais:['', Validators.required],
    roles:['anfitrion, viajero']
  })


  ngOnInit(): void {
    
  }

  registrarUser(){
    this.usuarioRegistro = this.registerForm.value;
    this.usuarioRegistro.roles = this.roles;

    this.authService.registroUsuario(this.registerForm.value).subscribe(
      data => {
        alert('Datos ingresados correctamente, por favor proceda a loguearse :D');
        this.router.navigate(['login']);
      }, error =>{
        console.log(error);
        alert('Hubo algun error, por favor verifique el nombre de usuario o alguno de los otros campos');
      }
    )
    
  }

  redirectToLogin(){
    this.router.navigate(['login']);
  }

  

}
