import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/authguard'; // Si usas un guard para proteger rutas
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';



const routes: Routes = [
  // Ruta para el login, se debe cargar primero
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirige a /login si la ruta está vacía
  { path: 'login', component: LoginComponent }, // Ruta para el login
  //{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Ruta protegida por AuthGuard
  // Añadir más rutas protegidas si es necesario
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./layouts/admin-layout/admin-layout.module").then(x => x.AdminLayoutModule)
      }
    ],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }, // Redirige a login en caso de una ruta no válida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
