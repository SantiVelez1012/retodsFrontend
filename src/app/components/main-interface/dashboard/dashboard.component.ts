import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryapiService } from 'src/app/services/countryapi.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private tokenService:TokenService, private router:Router, private countryApi:CountryapiService ) { }
  ngOnInit(): void {
    this.countryApi.authCountryApi().subscribe();
  }

  

}
