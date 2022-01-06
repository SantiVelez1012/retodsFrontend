import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityModel } from 'src/app/models/geo-models/city-model';
import { CountryModel } from 'src/app/models/geo-models/country-model';
import { StateModel } from 'src/app/models/geo-models/state-model';
import { CountryapiService } from 'src/app/services/countryapi.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-new-house',
  templateUrl: './new-house.component.html',
  styleUrls: ['./new-house.component.css']
})
export class NewHouseComponent implements OnInit {

  constructor(private countryApiService: CountryapiService, private router: Router, private fb: FormBuilder, private fstorage: AngularFireStorage,
    private houseService: HouseService) { }


  //@ts-ignore
  paises: CountryModel[] = [];
  estados: StateModel[] = [];
  ciudades: CityModel[] = [];


  uploadPercent: Observable<any> | undefined;

  urlImage!: Observable<any> | undefined;

  ngOnInit(): void {

    this.cargarPaises();

  }

  houseRegisterForm = this.fb.group({
    idCasa: [''],
    direccion: ['', Validators.required],
    pais: ['', Validators.required],
    estado: ['', Validators.required],
    ciudad: ['', Validators.required],
    telefono: ['', Validators.required],
    urlFoto: ['']
  })

  registrarCasa(event: Event) {
    event.preventDefault();


    try {
      this.houseService.guardarCasa(this.houseRegisterForm.value).subscribe(
        data => {
          console.log(data);
        });
    } catch (e) {
      console.log(e);
    }    

  }

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

  onUpload(e: Event) {
    const id = Math.random().toString(36).substring(2);
    //@ts-ignore
    const file = e.target.files[0];
    const filePath = `subidas/casas/fotos/${id}`;
    const ref = this.fstorage.ref(filePath);
    const task = this.fstorage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe(finalize(() => {
      this.urlImage = ref.getDownloadURL();

      this.urlImage.subscribe(url => {
        this.houseRegisterForm.get('urlFoto')?.setValue(this.urlImage);
      });

    })).subscribe();
  }

}
