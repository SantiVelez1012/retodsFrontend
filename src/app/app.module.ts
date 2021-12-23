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
import { FooterAppComponent } from './components/layout/footer-app/footer-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/main-interface/dashboard/dashboard.component';
import { CountriesInterceptorService } from './interceptors/countries-interceptor.service';
import { NewHouseComponent } from './components/anfitrion-interface/new-house/new-house.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterFormComponentComponent,
    LoginFormComponentComponent,
    NavbarAppComponent,
    FooterAppComponent,
    DashboardComponent,
    NewHouseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:ProdInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: CountriesInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
