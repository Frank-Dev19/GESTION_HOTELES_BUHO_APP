import { Routes } from "@angular/router";
import { HomeComponent } from "../../pages/home/home.component"
import { AuthGuard } from '../../helpers/authguard';
import { GesionUsuariosComponent } from "../../pages/gesion-usuarios/gesion-usuarios.component";
import { DashboardComponent } from "../../components/dashboard/dashboard.component";
import { CategoriasProductosComponent } from "../../pages/categorias-productos/categorias-productos.component";
import { GestionHabitacionesComponent } from "../../pages/gestion-habitaciones/gestion-habitaciones.component";
import { GestionReservasComponent } from "../../pages/gestion-reservas/gestion-reservas.component";
import { GestionModoPagoComponent } from "../../pages/gestion-modo-pago/gestion-modo-pago.component";
import { pruebaComponent } from "../../pages/prueba/prueba.component";
import { GestionClientesComponent } from "../../pages/gestion-clientes/gestion-clientes.component";
import { GestionServiciosComponentComponent } from "../../pages/gestion-servicios.component/gestion-servicios.component.component";
import { GestionSolicitudesComponent } from "../../pages/gestion-solicitudes/gestion-solicitudes.component";
import { GestionCalificacionesComponent } from "../../pages/gestion-calificaciones/gestion-calificaciones.component";


export const AdminLayoutRoutes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "gestionUsuarios", component: GesionUsuariosComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "CategoriasProductos", component: CategoriasProductosComponent },
    { path: "habitaciones", component: GestionHabitacionesComponent },
    { path: "reservasHabitaciones", component: GestionReservasComponent },
    { path: "modoPago", component: GestionModoPagoComponent },
    { path: "prueba", component: pruebaComponent },
    { path: "clientes", component: GestionClientesComponent },
    { path: "servicios", component: GestionServiciosComponentComponent },
    { path: "solicitudes", component: GestionSolicitudesComponent },
    { path: "calificaciones", component: GestionCalificacionesComponent },
];
