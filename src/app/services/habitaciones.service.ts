import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { config } from "../../environments/environment";
import { BaseService } from "./base.service";

import { HabitacionesResponse } from "../models/habitaciones/habitaciones-response";
import { habitacionesSaveRequest, habitacionesDeleteRequest, listarPorTipoHabitaciones } from "../models/habitaciones/habitaciones-request";

@Injectable({
    providedIn: 'root'
})

export class HabitacionesService {
    constructor(private base: BaseService) { }


    GuardarHabitaciones(request: habitacionesSaveRequest): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.habitaciones + 'guardarHabitacion', request);
    }

    EliminarHabitaciones(request: habitacionesDeleteRequest[]): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.habitaciones + 'eliminarHabitacion', {
            listaRequest: request
        });
    }

    ListarHabitaciones(): Observable<HabitacionesResponse[]> {
        return this.base.ExecuteHttpPost<HabitacionesResponse[]>(config.habitaciones + 'listarHabitaciones', {});
    }

    ListarHabitacionesPorTipo(request: listarPorTipoHabitaciones[]): Observable<HabitacionesResponse[]> {
        return this.base.ExecuteHttpPost<HabitacionesResponse[]>(config.habitaciones + 'listarHabitacionesPorTipo', { request });
    }

}