import { Component, OnInit } from '@angular/core';
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

  constructor(private countryApiService:CountryapiService, private router:Router) { }
  //@ts-ignore
  paises:CountryModel[] = [];
  estados: StateModel[] = [];
  ciudades: CityModel[] = [];

  ngOnInit(): void {

    this.cargarPaises();
    
  }

  private cargarPaises(){
    this.countryApiService.getCountries().subscribe( data =>{
      this.paises = data;
      console.log(this.paises);
    });
  }

  cargarEstados(pais:string){
    
  }

}
