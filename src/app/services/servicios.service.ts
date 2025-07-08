import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { config } from "../../environments/environment";

import { ServicioResponse } from "../models/servicios/servicios-response";
import { ServiciosSaveRequest, ServiciosDeleteRequest, listarPorCategoriaServicio } from "../models/servicios/servicios-request";

@Injectable({
    providedIn: 'root'
})
export class ServiciosService {
    constructor(private base: BaseService) { }

    GuardarServicios(request: ServiciosSaveRequest): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.servicios + 'guardarServicios', request);
    }

    EliminarServicios(request: ServiciosDeleteRequest[]): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.servicios + 'eliminarServicios', {
            listaRequest: request
        });
    }

    ListarServicios(): Observable<ServicioResponse[]> {
        return this.base.ExecuteHttpPost<ServicioResponse[]>(config.servicios + 'listarServicios', {});
    }

    ListarServiciosPorCategoria(request: listarPorCategoriaServicio[]): Observable<ServicioResponse[]> {
        return this.base.ExecuteHttpPost<ServicioResponse[]>(config.servicios + 'listarServiciosPorCategoria', { request });
    }
}