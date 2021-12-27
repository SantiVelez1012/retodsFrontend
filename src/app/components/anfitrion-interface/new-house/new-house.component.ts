import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityModel } from 'src/app/models/geo-models/city-model';
import { CountryModel } from 'src/app/models/geo-models/country-model';
import { StateModel } from 'src/app/models/geo-models/state-model';
import { CountryapiService } from 'src/app/services/countryapi.service';

@Component({
  selector: 'app-new-house',
  templateUrl: './new-house.component.html',
  styleUrls: ['./new-house.component.css']
})
export class NewHouseComponent implements OnInit {

  constructor(private countryApiService:CountryapiService, private router:Router, private fb:FormBuilder) { }
  //@ts-ignore
  paises:CountryModel[] = [];
  estados: StateModel[] = [];
  ciudades: CityModel[] = [];

  ngOnInit(): void {

    this.cargarPaises();
    
  }

  houseRegisterForm = this.fb.group({
    idCasa: [''],
    direccion: ['', Validators.required],
    pais:['', Validators.required],
    estado:['', Validators.required],
    ciudad: ['', Validators.required],
    telefono:['', Validators.required],
    urlFoto:['']
  })

  registrarCasa(){

  }

  private cargarPaises(){
    this.countryApiService.getCountries().subscribe( data =>{
      this.paises = data;
    });
  }

  cargarEstados(pais:string){
    this.countryApiService.getStatesByCity(pais).subscribe( estados => {
      this.estados = [];
      console.log(this.estados);
      this.estados = estados;
      
    });
  }

  cargarCiudades(estado:string){

  }

}
