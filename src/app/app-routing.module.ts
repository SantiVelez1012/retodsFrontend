import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponentComponent } from './components/main-interface/login-form-component/login-form-component.component';
import { RegisterFormComponentComponent } from './components/main-interface/register-form-component/register-form-component.component';

const routes: Routes = [
  {path: '', redirectTo:'register', pathMatch:'full'},
  {path: 'register', component:RegisterFormComponentComponent, pathMatch:'full'},
  {path: 'login', component:LoginFormComponentComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
