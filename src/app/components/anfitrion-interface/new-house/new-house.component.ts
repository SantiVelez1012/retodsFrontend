import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryModel } from 'src/app/models/geo-models/country-model';
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

  ngOnInit(): void {
    this.countryApiService.getCountries().subscribe( data =>{
      this.paises = data;
      console.log(this.paises);
    });
  }

}
