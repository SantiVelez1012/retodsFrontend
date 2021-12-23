import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { validateCountryApi } from '../interceptors/countries-interceptor.service';
import { TokenService } from './token.service';
import { CountryModel } from '../models/geo-models/country-model';
import { StateModel } from '../models/geo-models/state-model';
import { CityModel } from '../models/geo-models/city-model';

@Injectable({
  providedIn: 'root'
})
export class CountryapiService {

  constructor(private tokenService:TokenService, private http:HttpClient) { }

  private authCountryT = environment.authCountryToken;


  authCountryApi(){
    return this.http.get<any>(`${environment.countriesUrl}/getaccesstoken`, {
      headers:{
        'Accept':'application/json',
        'api-token':this.authCountryT,
        'user-email':"santivekez1012@gmail.com"
      }
    })
    .pipe(tap(res => this.tokenService.setCountryToken(res.auth_token)));
  }

  getCountries(){
    return this.http.get<CountryModel[]>(`${environment.countriesUrl}/countries`,{
      context:validateCountryApi()
    });
  }

  getStatesByCity(countryName:string){
    return this.http.get<StateModel[]>(`${environment.countriesUrl}/states/${countryName}`,{
      context:validateCountryApi()
    });
  }

  getCitiesByState(stateName:string){
    return this.http.get<CityModel[]>(`${environment.countriesUrl}/cities/${stateName}`,
    {context:validateCountryApi()}
    );
  }


}
