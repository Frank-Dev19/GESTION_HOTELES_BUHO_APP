import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from './../../environments/environment';
import { BaseService } from './base.service';

import { ProductoResponse } from '../models/productos/productos-response';
import { ProductosSaveRequest, ProductosDeleteRequest, listarPorCategoria } from '../models/productos/productos-request';



@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    constructor(private base: BaseService) { }

    GuardarProductos(request: ProductosSaveRequest): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.productos + 'guardarProductos', request);
    }

    EliminarProductos(request: ProductosDeleteRequest[]): Observable<Boolean> {
        return this.base.ExecuteHttpPost<Boolean>(config.productos + 'eliminarProductos', {
            listaRequest: request
        });
    }

    ListarProductos(): Observable<ProductoResponse[]> {
        return this.base.ExecuteHttpPost<ProductoResponse[]>(config.productos + 'listarProductos', {});
    }

    ListarProductosPorCategoria(request: listarPorCategoria[]): Observable<ProductoResponse[]> {
        return this.base.ExecuteHttpPost<ProductoResponse[]>(config.productos + 'listarProductosPorCategoria', { request });
    }

} 