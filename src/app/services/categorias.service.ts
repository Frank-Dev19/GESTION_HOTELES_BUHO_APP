import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from './../../environments/environment';
import { BaseService } from './base.service';

import { CategoriasSaveRequest, CategoriasDeleteRequest } from '../models/categorias/categorias-request';
import { CategoriasResponse } from '../models/categorias/categorias-response';


@Injectable({
    providedIn: 'root'
})
export class CategoriasService {

    constructor(private base: BaseService) { }

    GuardarCategorias(request: CategoriasSaveRequest): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.categorias + 'guardarCategorias', request);
    }

    EliminarCategorias(request: CategoriasDeleteRequest[]): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.categorias + 'eliminarCategorias', {
            listaRequest: request
        });
    }

    ListarCategorias(): Observable<CategoriasResponse[]> {
        return this.base.ExecuteHttpPost<CategoriasResponse[]>(config.categorias + 'listarCategorias', {});
    }

}