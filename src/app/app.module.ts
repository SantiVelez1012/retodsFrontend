import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProdInterceptor } from './interceptors/prod.interceptor';
import { RegisterFormComponentComponent } from './components/main-interface/register-form-component/register-form-component.component';
import { LoginFormComponentComponent } from './components/main-interface/login-form-component/login-form-component.component';
import { NavbarAppComponent } from './components/layout/navbar-app/navbar-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/main-interface/dashboard/dashboard.component';
import { CountriesInterceptorService } from './interceptors/countries-interceptor.service';
import { NewHouseComponent } from './components/anfitrion-interface/new-house/new-house.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { HouseSearchComponent } from './components/visitante-interface/house-search/house-search.component';
import { HouseDetailsComponent } from './components/visitante-interface/house-details/house-details.component';
import { ReservaPickerComponent } from './components/visitante-interface/reserva-picker/reserva-picker.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListadoCasasPropiedadComponent } from './components/anfitrion-interface/listado-casas-propiedad/listado-casas-propiedad.component';
import { ListadoReservasCasaComponent } from './components/anfitrion-interface/listado-reservas-casa/listado-reservas-casa.component';
import { ListadoReservasUsuarioComponent } from './components/visitante-interface/listado-reservas-usuario/listado-reservas-usuario.component';
import { CalificacionFormComponent } from './components/main-interface/calificacion-form/calificacion-form.component';
import { PerfilUsuarioComponent } from './components/main-interface/perfil-usuario/perfil-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponentComponent,
    LoginFormComponentComponent,
    NavbarAppComponent,
    DashboardComponent,
    NewHouseComponent,
    HouseSearchComponent,
    HouseDetailsComponent,
    ReservaPickerComponent,
    ListadoCasasPropiedadComponent,
    ListadoReservasCasaComponent,
    ListadoReservasUsuarioComponent,
    CalificacionFormComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    NgbModule,
    NgbDatepickerModule

  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:ProdInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: CountriesInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
