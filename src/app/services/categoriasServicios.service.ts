import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";
import { config } from "../../environments/environment";

import { CategoriaServicioResponse } from "../models/servicios/categoriaServicios-response";
import { CategoriaServicioSaveRequest, CategoriaServicioDeleteRequest } from "../models/servicios/categoriaServicios-request";

@Injectable({
    providedIn: 'root'
})

export class CategoriasServiciosService {

    constructor(private base: BaseService) { }


    GuardarCategoriasServicio(request: CategoriaServicioSaveRequest): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.categoriasServicio + 'guardarCategoriasServicio', request);
    }

    EliminarCategoriasServicio(request: CategoriaServicioDeleteRequest[]): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.categoriasServicio + 'eliminarCategoriasServicio', {
            listaRequest: request
        });
    }

    ListarCategoriasServicio(): Observable<CategoriaServicioResponse[]> {
        return this.base.ExecuteHttpPost<CategoriaServicioResponse[]>(config.categoriasServicio + 'listarCategoriasServicio', {});
    }

}