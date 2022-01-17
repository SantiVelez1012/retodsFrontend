import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CasaModel } from 'src/app/models/casa-model';
import { CityModel } from 'src/app/models/geo-models/city-model';
import { CountryModel } from 'src/app/models/geo-models/country-model';
import { StateModel } from 'src/app/models/geo-models/state-model';
import { NewCasaModel } from 'src/app/models/newcasa-model';
import { CountryapiService } from 'src/app/services/countryapi.service';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-house-search',
  templateUrl: './house-search.component.html',
  styleUrls: ['./house-search.component.css']
})
export class HouseSearchComponent implements OnInit {

  constructor(private countryApiService: CountryapiService, private fb:FormBuilder, private casaService:HouseService) { }

  ngOnInit(): void {

    this.cargarPaises();

  }

  houseSearchForm = this.fb.group({
    pais: ['', Validators.required],
    estado: [''],
    ciudad: [''],
  })

  paises: CountryModel[] = [];
  estados: StateModel[] = [];
  ciudades: CityModel[] = [];
  casasBusqueda: CasaModel[] = [];


  private cargarPaises() {
    this.countryApiService.getCountries().subscribe(data => {
      this.paises = data;
    });
  }

  cargarEstados(pais: string) {
    this.countryApiService.getStatesByCity(pais).subscribe(estados => {
      this.estados = [];
      console.log(this.estados);
      this.estados = estados;
    });
  }

  cargarCiudades(estado: string) {

    this.countryApiService.getCitiesByState(estado).subscribe(ciudades => {
      this.ciudades = [];
      console.log(this.ciudades);
      this.ciudades = ciudades;

      if (this.ciudades.length === 0) {
        this.ciudades.push({
          city_name: estado
        });
      }

    });

  }

  buscarCasa(e:Event){
    this.casasBusqueda = [];
    this.casaService.getHousesByCriterio(this.houseSearchForm.value).subscribe( data =>{
      console.log(data);
      this.casasBusqueda = data;
    });

  }

  buscarTodas(e:Event){
    this.casasBusqueda = [];
    this.casaService.obtenerTodas().subscribe(data =>{
      this.casasBusqueda = data;
      console.log(data);
    })
  }

}
