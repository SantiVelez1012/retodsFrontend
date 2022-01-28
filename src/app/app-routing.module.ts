import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoCasasPropiedadComponent } from './components/anfitrion-interface/listado-casas-propiedad/listado-casas-propiedad.component';
import { ListadoReservasCasaComponent } from './components/anfitrion-interface/listado-reservas-casa/listado-reservas-casa.component';
import { NewHouseComponent } from './components/anfitrion-interface/new-house/new-house.component';
import { CalificacionFormComponent } from './components/main-interface/calificacion-form/calificacion-form.component';
import { DashboardComponent } from './components/main-interface/dashboard/dashboard.component';
import { LoginFormComponentComponent } from './components/main-interface/login-form-component/login-form-component.component';
import { PerfilUsuarioComponent } from './components/main-interface/perfil-usuario/perfil-usuario.component';
import { RegisterFormComponentComponent } from './components/main-interface/register-form-component/register-form-component.component';
import { HouseDetailsComponent } from './components/visitante-interface/house-details/house-details.component';
import { HouseSearchComponent } from './components/visitante-interface/house-search/house-search.component';
import { ListadoReservasUsuarioComponent } from './components/visitante-interface/listado-reservas-usuario/listado-reservas-usuario.component';
import { ReservaPickerComponent } from './components/visitante-interface/reserva-picker/reserva-picker.component';
import { LoginGuard } from './guards/login-guard';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:"full"},
  {path: 'register', component:RegisterFormComponentComponent, pathMatch:'full'},
  {path: 'login', component:LoginFormComponentComponent, pathMatch:'full'},
  {path: 'dashboard', component:DashboardComponent, pathMatch:'full', canActivate:[LoginGuard]},
  {path: 'newHouse', component:NewHouseComponent, pathMatch:'full', canActivate:[LoginGuard]},
  {path: 'houseSearch', component:HouseSearchComponent, pathMatch:'full', canActivate:[LoginGuard]},
  {path: 'house/:id', component:HouseDetailsComponent, pathMatch:'full', canActivate:[LoginGuard]},
  {path: 'reserva/:id', component:ReservaPickerComponent, pathMatch:'full', canActivate:[LoginGuard]},
  {path: 'lcregistradas', component:ListadoCasasPropiedadComponent, pathMatch:'full', canActivate:[LoginGuard]},
  {path: 'lreservas/:id', component:ListadoReservasCasaComponent, pathMatch:'full', canActivate:[LoginGuard]},
  {path: 'lreservasu', component:ListadoReservasUsuarioComponent, pathMatch:'full', canActivate:[LoginGuard]},
  {path: 'calificacionViajero/:id', component:CalificacionFormComponent, pathMatch:'full', canActivate:[LoginGuard]},
  {path: 'calificacionAnfitrion/:id', component:CalificacionFormComponent, pathMatch:'full', canActivate:[LoginGuard]},
  {path:'perfilUsuario/:id', component:PerfilUsuarioComponent, pathMatch:'full', canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
