import { Component, OnInit } from '@angular/core';
import { CasaModel } from 'src/app/models/casa-model';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-listado-casas-propiedad',
  templateUrl: './listado-casas-propiedad.component.html',
  styleUrls: ['./listado-casas-propiedad.component.css']
})
export class ListadoCasasPropiedadComponent implements OnInit {

  constructor(private houseService:HouseService) { }

  casas:CasaModel[] = [];

  ngOnInit(): void {

    this.houseService.getHousesByLoggedUser().subscribe(data =>{
      this.casas = data;
    })

  }

}
