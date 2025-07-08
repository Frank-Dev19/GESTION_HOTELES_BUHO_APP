import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { config } from "../../environments/environment";
import { BaseService } from "./base.service";
import { ClientesResponse } from "../models/clientes/clientes-response";
import { ClientesSaveRequest, ClientesDeleteRequest } from "../models/clientes/clientes-request";

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    private constructor(private base: BaseService) { }

    GuardarClientes(request: ClientesSaveRequest): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.clientes + 'guardarClientes', request);
    }

    EliminarClientes(request: ClientesDeleteRequest[]): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.clientes + 'eliminarClientes', {
            listaRequest: request
        });
    }

    ListarUsuarios(): Observable<ClientesResponse[]> {
        return this.base.ExecuteHttpPost<ClientesResponse[]>(config.clientes + 'listarClientes', {});
    }


}