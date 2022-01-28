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
import { NewCasaModel } from 'src/app/models/newcasa-model';

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
  casa!: NewCasaModel;
  casaString!:string;
  imgSubida:boolean = true;
  


  uploadPercent$: Observable<any> | undefined;

  urlImage$: Observable<any> | undefined;

  ngOnInit(): void {

    this.cargarPaises();

  }

  houseRegisterForm = this.fb.group({
    idCasa: [null],
    direccion: ['', Validators.required],
    pais: ['', Validators.required],
    estado: ['', Validators.required],
    ciudad: ['', Validators.required],
    telefono: ['', Validators.required],
    foto: ['']
  })

  registrarCasa(event: Event) {
    event.preventDefault();
    
    console.log(this.houseRegisterForm.value);

    try {
      this.houseService.guardarCasa(this.houseRegisterForm.value).subscribe(
        data => {
          alert('Casa registrada correctamente, lo redireccionaremos al dashboard');
          this.router.navigate(['dashboard']);
        });
    } catch (e) {
      alert('Hubo un error, por favor verifique el formulario e intente de nuevo, gracias :D');
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
      this.estados = estados;
    });
  }

  cargarCiudades(estado: string) {

    this.countryApiService.getCitiesByState(estado).subscribe(ciudades => {
      this.ciudades = [];
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

    this.uploadPercent$ = task.percentageChanges();

    task.snapshotChanges().pipe(finalize(() => {
      this.urlImage$ = ref.getDownloadURL();

      this.urlImage$.subscribe(url => {
        this.houseRegisterForm.get('foto')?.setValue(url);
        this.imgSubida = false;
      });

    })).subscribe();
  }

}
