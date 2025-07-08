import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { config } from "../../environments/environment";
import { BaseService } from "./base.service";

import { TipoHabitacionesSaveRequest, TipoHabitacionesDeleteRequest } from "../models/tipoHabitaciones/tipoHabitaciones-request";

import { TipoHabitacionesResponse } from "../models/tipoHabitaciones/tipoHabitaciones-response";

@Injectable({
    providedIn: 'root'
})

export class TipoHabitacionesService {
    constructor(private base: BaseService) { }

    GuardarTipoHabitaciones(request: TipoHabitacionesSaveRequest): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.tipoHabitaciones + 'guardarTipoHabitacion', request);
    }

    EliminarTipoHabitaciones(request: TipoHabitacionesDeleteRequest[]): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.tipoHabitaciones + 'eliminarTipoHabitacion', {
            listaRequest: request
        });
    }

    ListarTipoHabitaciones(): Observable<TipoHabitacionesResponse[]> {
        return this.base.ExecuteHttpPost<TipoHabitacionesResponse[]>(config.tipoHabitaciones + 'listarTipoHabitacion', {});
    }
}

