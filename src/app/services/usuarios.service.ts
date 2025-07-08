import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from './../../environments/environment';
import { UserSession, Usuario } from '../models/user';
import { BaseService } from './base.service';
import { UsuariosSaveRequest } from '../models/usuarios/usuarios-request';
import { UsuariosDeleteRequest } from '../models/usuarios/usuarios-request';
import { UsuariosResponse } from '../models/usuarios/usuarios-response';


@Injectable({
    providedIn: 'root'
})
export class UsuariosService {

    constructor(private base: BaseService) { }

    GuardarUsuarios(request: UsuariosSaveRequest): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.authMethod + 'register', request);
    }

    EliminarUsuarios(request: UsuariosDeleteRequest[]): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.usuarios + 'eliminarUsuarios', {
            listaRequest: request
        });
    }

    ListarUsuarios(): Observable<UsuariosResponse[]> {
        return this.base.ExecuteHttpPost<UsuariosResponse[]>(config.usuarios + 'listarUsuarios', {});
    }










}