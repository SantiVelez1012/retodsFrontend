import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoCasasPropiedadComponent } from './components/anfitrion-interface/listado-casas-propiedad/listado-casas-propiedad.component';
import { NewHouseComponent } from './components/anfitrion-interface/new-house/new-house.component';
import { DashboardComponent } from './components/main-interface/dashboard/dashboard.component';
import { LoginFormComponentComponent } from './components/main-interface/login-form-component/login-form-component.component';
import { RegisterFormComponentComponent } from './components/main-interface/register-form-component/register-form-component.component';
import { HouseDetailsComponent } from './components/visitante-interface/house-details/house-details.component';
import { HouseSearchComponent } from './components/visitante-interface/house-search/house-search.component';
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
  {path: 'listadoReservas', component:ListadoCasasPropiedadComponent, pathMatch:'full', canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
