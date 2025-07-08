import { Injectable } from "@angular/core"
import { BaseService } from "../services/base.service"
import { Observable } from "rxjs"
import { config } from "../../environments/environment"

import { ModoPagoSaveRequest, ModoPagoDeleteRequest } from "../models/modoPago/modoPago-request"
import { ModoPagoResponse } from "../models/modoPago/modoPago-response"

@Injectable({
    providedIn: 'root'
})
export class ModoPagoService {

    constructor(private base: BaseService) { }

    GuardarModoPago(request: ModoPagoSaveRequest): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.modoPago + "guardarModoPago", request);
    }

    EliminarModoPago(request: ModoPagoDeleteRequest[]): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.modoPago + "eliminarModoPago", { listaRequest: request });
    }

    ListarModoPago(): Observable<ModoPagoResponse[]> {
        return this.base.ExecuteHttpPost<ModoPagoResponse[]>(config.modoPago + "listarModoPago", {});
    }

}