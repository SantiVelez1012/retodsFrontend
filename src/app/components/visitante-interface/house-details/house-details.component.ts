import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasaModel } from 'src/app/models/casa-model';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-house-details',
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.css']
})
export class HouseDetailsComponent implements OnInit {

  constructor(private aRoute:ActivatedRoute, private casaService:HouseService) { }

  idCasa:string = this.aRoute.snapshot.params.id;
  casa!:CasaModel;

  ngOnInit(): void {
    this.casaService.getHouseById(this.idCasa).subscribe(data=>{
      this.casa = data;
      console.log(this.casa);
    },err =>{
      console.log(err);
      
    })
    

  }

}
