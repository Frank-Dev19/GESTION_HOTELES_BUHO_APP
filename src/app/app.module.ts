import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth-interceptor';
import { LoginComponent } from './components/login/login.component';

import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from './services/login-service.service';

import { BaseService } from './services/base.service';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component'
import { ComponentsModule } from './components/components.module'


import localePE from "@angular/common/locales/es-PE";
import { registerLocaleData } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

//import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


registerLocaleData(localePE, 'es-PE');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, // Asegúrate de incluir esto aquí
    ComponentsModule,
    NgbModule,
    NgbCollapseModule,
    NgApexchartsModule
    // NgbPaginationModule,
    // NgbAlertModule
  ],
  providers: [
    LoginService,
    { provide: LOCALE_ID, useValue: "es-PE" },
    BaseService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
