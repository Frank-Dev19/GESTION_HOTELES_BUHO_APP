import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule, DatePipe } from "@angular/common";
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { AdminLayoutRoutes } from "./admin-layout.routing";
import { HomeComponent } from '../../pages/home/home.component';
import { GesionUsuariosComponent } from '../../pages/gesion-usuarios/gesion-usuarios.component';
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { CategoriasProductosComponent } from "../../pages/categorias-productos/categorias-productos.component";
import { GestionHabitacionesComponent } from "../../pages/gestion-habitaciones/gestion-habitaciones.component";
import { GestionReservasComponent } from "../../pages/gestion-reservas/gestion-reservas.component";
import { NgApexchartsModule } from 'ng-apexcharts';
import { GestionModoPagoComponent } from "../../pages/gestion-modo-pago/gestion-modo-pago.component";
import { pruebaComponent } from "../../pages/prueba/prueba.component";
import { GestionClientesComponent } from "../../pages/gestion-clientes/gestion-clientes.component";
import { GestionServiciosComponentComponent } from "../../pages/gestion-servicios.component/gestion-servicios.component.component";
import { GestionSolicitudesComponent } from "../../pages/gestion-solicitudes/gestion-solicitudes.component";
import { GestionCalificacionesComponent } from "../../pages/gestion-calificaciones/gestion-calificaciones.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        NgbCollapseModule,
        NgApexchartsModule
        //   AgGridModule,
        //   NgMultiSelectDropDownModule,
        //   FullCalendarModule,
        //   BsDatepickerModule.forRoot(),
        //   ModalModule.forChild(),
        //   NgSelectModule,
        //   PopoverModule.forRoot(),
        //   IMaskModule
    ],
    declarations: [
        HomeComponent,
        GesionUsuariosComponent,
        DashboardComponent,
        CategoriasProductosComponent,
        GestionHabitacionesComponent,
        GestionReservasComponent,
        GestionModoPagoComponent,
        GestionClientesComponent,
        GestionServiciosComponentComponent,
        GestionSolicitudesComponent,
        GestionCalificacionesComponent
        //pruebaComponent
    ],
    providers: [DatePipe],
    exports: [
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AdminLayoutModule { }
